import { BaseEvent } from "./base-event";

export interface WithdrawEvent extends BaseEvent {
  type: "withdraw";
  origin: string;
  amount: number;
}
