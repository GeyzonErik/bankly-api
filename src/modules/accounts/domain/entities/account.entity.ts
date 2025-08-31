import { AccountOperationResult } from "../types/account-operation-result";
import { TransferResult } from "../types/transfer-result";

export class Account {
  constructor(private _id: string, private _balance: number = 0) {
    if (_balance < 0) {
      throw new Error("Initial balance cannot be negative");
    }
  }

  get id(): string {
    return this._id;
  }

  get balance(): number {
    return this._balance;
  }

  deposit(amount: number): AccountOperationResult {
    if (amount <= 0) {
      throw new Error("Deposit amount must be positive");
    }
    this._balance += amount;

    return {
      affectedAccount: this.clone(),
    };
  }

  withdraw(amount: number): AccountOperationResult {
    if (amount <= 0) {
      throw new Error("Withdrawal amount must be positive");
    }

    if (this._balance < amount) {
      throw new Error("Insufficient funds");
    }

    this._balance -= amount;

    return {
      affectedAccount: this.clone(),
    };
  }

  transfer(amount: number, destination: Account): TransferResult {
    if (amount <= 0) {
      throw new Error("Transfer amount must be positive");
    }

    if (this._balance < amount) {
      throw new Error("Insufficient funds");
    }

    this._balance -= amount;
    destination._balance += amount;

    return {
      origin: this.clone(),
      destination: destination.clone(),
    };
  }

  private clone(): Account {
    return new Account(this._id, this._balance);
  }

  static createWithInitalBalance(
    id: string,
    initialBalance: number = 0
  ): Account {
    return new Account(id, initialBalance);
  }
}
