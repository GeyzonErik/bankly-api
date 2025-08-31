import { BaseEvent } from "./base-event";

export interface DepositEvent extends BaseEvent {
  type: "deposit";
  destination: string;
  amount: number;
}
