export class AccountNotFoundError extends Error {
  statusCode: number;

  constructor(accountId: string) {
    super(`Account with id ${accountId} not found`);
    this.name = "AccountNotFoundError";
    this.statusCode = 404;

    Object.setPrototypeOf(this, AccountNotFoundError.prototype);
  }
}
