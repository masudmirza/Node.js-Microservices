import { Service } from "typedi";
import { EventBus } from "./event-bus";
import CustomerService from "../services/customer.service";
import { KafkaTopic } from "../domain/enums/kafka-topic";
import { KafkaConsumerGroup } from "../domain/enums/kafka-consumer-group";

@Service()
export class EventHandler {
  constructor(
    private readonly eventBus: EventBus,
    private readonly customerService: CustomerService,
  ) {}

  public async initialize(): Promise<void> {
    await this.eventBus.subscribe(
      KafkaTopic.CUSTOMER_BALANCE_INCREASE_REQUESTED,
      KafkaConsumerGroup.CUSTOMER_MS_GROUP,
      async (data) => {
        await this.customerService.increaseCustomerBalance(
          data.customerId,
          data.amount,
          data.transactionId,
        );
      },
    );

    await this.eventBus.subscribe(
      KafkaTopic.CUSTOMER_BALANCE_DECREASE_REQUESTED,
      KafkaConsumerGroup.CUSTOMER_MS_GROUP,
      async (data) => {
        await this.customerService.decreaseCustomerBalance(
          data.customerId,
          data.amount,
          data.transactionId,
        );
      },
    );
  }
}
