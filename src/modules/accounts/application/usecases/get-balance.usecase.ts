import { AccountNotFoundError } from "../../domain/errors/account-not-found.error";
import { IAccountRepository } from "../repositories/account-repository";

export class GetBalanceUseCase {
  constructor(private accountRepository: IAccountRepository) {}

  async execute(accountId: string): Promise<number> {
    if (!accountId) {
      throw new Error("Account ID is required");
    }

    const account = await this.accountRepository.findById(accountId);

    if (!account) {
      throw new AccountNotFoundError(accountId);
    }

    return account.balance;
  }
}
