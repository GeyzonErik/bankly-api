import { IAccountRepository } from "@/modules/accounts/application/repositories/account-repository";
import { HandlerFactory } from "../factories/handler.factory";
import { BankEvent } from "../../domain/types/bank-event";
import { HandlerResult } from "../../domain/types/handle-result";

export class ProcessEventUseCase {
  private handlerFactory: HandlerFactory;

  constructor(private accountRepository: IAccountRepository) {
    this.handlerFactory = new HandlerFactory(accountRepository);
  }

  async execute(event: BankEvent): Promise<HandlerResult> {
    this.validateEvent(event);

    const handler = this.handlerFactory.getHandler(event.type);

    return await handler.handle(event);
  }

  private validateEvent(event: BankEvent): void {
    if (!event.type) {
      throw new Error("Event type is required");
    }

    if (!this.handlerFactory.isEventTypeSupported(event.type)) {
      throw new Error(`Unsupported event type: ${event.type}`);
    }

    switch (event.type) {
      case "deposit":
        if (!event.destination || event.amount <= 0) {
          throw new Error(
            "Deposit requires valid destination and positive amount"
          );
        }
        break;

      case "withdraw":
        if (!event.origin || event.amount <= 0) {
          throw new Error("Withdraw requires valid origin and positive amount");
        }
        break;

      case "transfer":
        if (!event.origin || !event.destination || event.amount <= 0) {
          throw new Error(
            "Transfer requires valid origin, destination and positive amount"
          );
        }
        if (event.origin === event.destination) {
          throw new Error("Cannot transfer to the same account");
        }
        break;
    }
  }
}
