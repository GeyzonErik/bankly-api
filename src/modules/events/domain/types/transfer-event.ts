import { BaseEvent } from "./base-event";

export interface TransferEvent extends BaseEvent {
  type: "transfer";
  origin: string;
  destination: string;
  amount: number;
}
