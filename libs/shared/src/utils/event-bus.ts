import { Kafka, KafkaMessage, Producer, Consumer } from "kafkajs";

export class EventBus {
  private kafka: Kafka;
  private producer: Producer;
  private consumerRegistry: Map<string, Consumer> = new Map();
  private producerConnected = false;

  constructor(kafkaBrokers: string, clientId: string) {
    if (!kafkaBrokers) {
      throw new Error("KAFKA_BROKERS environment variable is not set");
    }

    this.kafka = new Kafka({ clientId, brokers: kafkaBrokers.split(",") });
    this.producer = this.kafka.producer();
  }

  async publish(topic: string, message: object, key?: string): Promise<void> {
    if (!this.producerConnected) {
      await this.producer.connect();
      this.producerConnected = true;
    }

    await this.producer.send({
      topic,
      messages: [{ key, value: JSON.stringify(message) }],
    });

    console.log(`[KafkaPubSub] Published to ${topic}:`, message);
  }

  async subscribe(
    topic: string,
    groupId: string,
    handler: (data: any, raw: KafkaMessage) => Promise<void>,
  ): Promise<void> {
    const key = `${topic}-${groupId}`;
    if (this.consumerRegistry.has(key)) return;

    const consumer = this.kafka.consumer({ groupId });
    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: false });

    await consumer.run({
      eachMessage: async ({ message }) => {
        try {
          const value = message.value?.toString() || "{}";
          const parsed = JSON.parse(value);
          await handler(parsed, message);
        } catch (err) {
          console.error(`[KafkaPubSub] Error handling ${topic} message:`, err);
        }
      },
    });

    this.consumerRegistry.set(key, consumer);
    console.log(`[KafkaPubSub] Subscribed to ${topic} in group ${groupId}`);
  }
}
