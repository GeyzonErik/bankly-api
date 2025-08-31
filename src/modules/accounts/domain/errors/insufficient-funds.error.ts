export class InsufficientFundsError extends Error {
  statusCode: number;

  constructor(
    accountId: string,
    requestedAmount: number,
    availableBalance: number
  ) {
    super(
      `Account ${accountId} has insufficient funds. Requested: ${requestedAmount}, Available: ${availableBalance}`
    );
    this.name = "InsufficientFundsError";
    this.statusCode = 400;

    Object.setPrototypeOf(this, InsufficientFundsError.prototype);
  }
}
