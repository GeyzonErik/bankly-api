import { IAccountRepository } from "@/modules/accounts/application/repositories/account-repository";
import { EventType } from "../../domain/types/event-type";
import { IEventHandler } from "../handlers/event.handler";
import { DepoistHandler } from "../handlers/adapters/deposit.handler";
import { WithdrawHandler } from "../handlers/adapters/withdraw.handler";
import { TransferHandler } from "../handlers/adapters/transfer.handler";

export class HandlerFactory {
  private handlers: Map<EventType, () => IEventHandler>;

  constructor(private accountRepository: IAccountRepository) {
    this.handlers = new Map<EventType, () => IEventHandler>([
      ["deposit", () => new DepoistHandler(this.accountRepository)],
      ["withdraw", () => new WithdrawHandler(this.accountRepository)],
      ["transfer", () => new TransferHandler(this.accountRepository)],
    ]);
  }

  getHandler(eventType: EventType): IEventHandler {
    const handler = this.handlers.get(eventType);

    if (!handler) {
      throw new Error(`No handler found for event type: ${eventType}`);
    }

    return handler();
  }

  isEventTypeSupported(eventType: string): eventType is EventType {
    return this.handlers.has(eventType as EventType);
  }
}
