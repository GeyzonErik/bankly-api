export class InvalidOperationError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = "InvalidOperationError";
    this.statusCode = 400;

    Object.setPrototypeOf(this, InvalidOperationError.prototype);
  }
}
