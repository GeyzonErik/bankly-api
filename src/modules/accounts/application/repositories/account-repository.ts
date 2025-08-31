import { Account } from "../../domain/entities/account.entity";

export abstract class IAccountRepository {
  abstract findById(id: string): Promise<Account | null>;
  abstract listAll(): Promise<Account[]>;
  abstract save(account: Account): Promise<void>;
  abstract update(account: Account): Promise<void>;
  abstract reset(): Promise<void>;
  abstract exists(accountId: string): Promise<boolean>;
}
