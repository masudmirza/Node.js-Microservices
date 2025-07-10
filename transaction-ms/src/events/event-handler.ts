import { Service } from "typedi";
import { EventBus } from "./event-bus";
import TransactionService from "../services/transaction.service";
import { KafkaTopic } from "../domain/enums/kafka-topic";
import { KafkaConsumerGroup } from "../domain/enums/kafka-consumer-group";
import { TransactionStatus } from "../domain/enums/transaction-status";

@Service()
export class EventHandler {
  constructor(
    private readonly eventBus: EventBus,
    private readonly transactionService: TransactionService,
  ) {}

  public async initialize(): Promise<void> {
    await this.eventBus.subscribe(
      KafkaTopic.CUSTOMER_BALANCE_SUCCESS,
      KafkaConsumerGroup.TRANSACTION_MS_GROUP,
      async (data) => {
        await this.transactionService.updateStatus(
          data.transactionId,
          TransactionStatus.SUCCESS,
        );
      },
    );

    await this.eventBus.subscribe(
      KafkaTopic.CUSTOMER_BALANCE_FAILED,
      KafkaConsumerGroup.TRANSACTION_MS_GROUP,
      async (data) => {
        await this.transactionService.updateStatus(
          data.transactionId,
          TransactionStatus.FAILED,
        );
      },
    );
  }
}
