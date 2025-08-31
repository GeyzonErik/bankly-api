import { IAccountRepository } from "../repositories/account-repository";

export class ResetAccountsUseCase {
  constructor(private accountRepository: IAccountRepository) {}

  async execute(): Promise<void> {
    await this.accountRepository.reset();
  }
}
