import { Account } from "../../domain/entities/account.entity";
import { IAccountRepository } from "../repositories/account-repository";

export class ListAccountsUseCase {
  constructor(private accountRepository: IAccountRepository) {}

  async execute(): Promise<Account[]> {
    return this.accountRepository.listAll();
  }
}
