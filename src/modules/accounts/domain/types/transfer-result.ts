import { Account } from "../entities/account.entity";

export interface TransferResult {
  origin: Account;
  destination: Account;
}
