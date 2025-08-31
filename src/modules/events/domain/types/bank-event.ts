import { DepositEvent } from "./deposit-event";
import { TransferEvent } from "./transfer-event";
import { WithdrawEvent } from "./withdraw-event";

export type BankEvent = DepositEvent | WithdrawEvent | TransferEvent;
