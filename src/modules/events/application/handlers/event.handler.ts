import { BankEvent } from "../../domain/types/bank-event";
import { HandlerResult } from "../../domain/types/handle-result";

export abstract class IEventHandler<T extends BankEvent = BankEvent> {
  abstract handle(event: T): Promise<HandlerResult>;
}
