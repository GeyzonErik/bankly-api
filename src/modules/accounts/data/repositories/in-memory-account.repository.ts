import { IAccountRepository } from "../../application/repositories/account-repository";
import { Account } from "../../domain/entities/account.entity";

export class InMemoryAccountRepository implements IAccountRepository {
  private static instance: InMemoryAccountRepository;
  private accounts: Map<string, Account> = new Map();

  static getInstance(): InMemoryAccountRepository {
    if (!InMemoryAccountRepository.instance) {
      InMemoryAccountRepository.instance = new InMemoryAccountRepository();
    }
    return InMemoryAccountRepository.instance;
  }

  async exists(accountId: string): Promise<boolean> {
    return this.accounts.has(accountId);
  }

  async findById(id: string): Promise<Account | null> {
    return this.accounts.get(id) || null;
  }

  async listAll(): Promise<Account[]> {
    return Array.from(this.accounts.values());
  }

  async save(account: Account): Promise<void> {
    this.accounts.set(account.id, account);
  }

  async update(account: Account): Promise<void> {
    if (!this.accounts.has(account.id)) {
      throw new Error(`Account with ID: ${account.id} not found for update.`);
    }

    this.accounts.set(account.id, account);
  }

  async reset(): Promise<void> {
    this.accounts.clear();
  }
}
