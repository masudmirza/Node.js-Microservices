import { Queue, Worker, Job, QueueEvents } from "bullmq";
import IORedis, { Redis } from "ioredis";
import { EventBus } from "../utils/event-bus";
import { Outbox } from "./outbox.model";

export class OutboxProcessor {
  private queue: Queue;
  private redisConnection: Redis;
  private queueEvents: QueueEvents;

  constructor(
    private readonly eventBus: EventBus,
    private readonly redisUrl: string,
  ) {
    this.redisConnection = new IORedis(this.redisUrl);
    this.queue = new Queue("outbox-queue", { connection: this.redisConnection });
    this.queueEvents = new QueueEvents("outbox-queue", {
      connection: this.redisConnection,
    });

    this.registerQueueEvents();
  }

  private registerQueueEvents(): void {
    this.queueEvents.on("completed", ({ jobId }) => {
      console.log(`[OutboxProcessor] ✅ Job ${jobId} completed successfully`);
    });

    this.queueEvents.on("failed", ({ jobId, failedReason }) => {
      console.error(`[OutboxProcessor] ❌ Job ${jobId} failed: ${failedReason}`);
    });
  }

  public async start(): Promise<void> {
    await this.queue.add(
      "flush-outbox",
      {},
      {
        repeat: { every: 1000 },
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 2000,
        },
        removeOnComplete: true,
        removeOnFail: false,
      },
    );

    new Worker(
      "outbox-queue",
      async (job: Job) => {
        const unsent = await Outbox.find({ sent: false }).limit(100);
        for (const entry of unsent) {
          try {
            await this.eventBus.publish(entry.topic, entry.payload, entry.key);
            entry.sent = true;
            await entry.save();
          } catch (err) {
            console.error("[OutboxProcessor] Failed to send event:", err);
          }
        }
      },
      { connection: this.redisConnection, concurrency: 5 },
    );
  }
}
