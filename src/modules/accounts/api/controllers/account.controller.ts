import { Request, Response } from "express";
import { IAccountRepository } from "../../application/repositories/account-repository";
import { GetBalanceUseCase } from "../../application/usecases/get-balance.usecase";
import { ResetAccountsUseCase } from "../../application/usecases/reset-accounts.usecase";
import { AccountNotFoundError } from "../../domain/errors/account-not-found.error";
import { ListAccountsUseCase } from "../../application/usecases/list-accounts.usecase";

export class AccountsController {
  private getBalanceUseCase: GetBalanceUseCase;
  private resetAccountUseCase: ResetAccountsUseCase;
  private listAccountsUseCase: ListAccountsUseCase;

  constructor(private accountRepository: IAccountRepository) {
    this.getBalanceUseCase = new GetBalanceUseCase(this.accountRepository);
    this.resetAccountUseCase = new ResetAccountsUseCase(this.accountRepository);
    this.listAccountsUseCase = new ListAccountsUseCase(this.accountRepository);
  }

  async listAccounts(): Promise<void> {
    const accounts = await this.listAccountsUseCase.execute();
    console.log(accounts);
  }

  async getBalance(req: Request, res: Response) {
    try {
      const accountId = req.query.account_id as string;

      if (!accountId) {
        res.status(400).send({ error: "Account ID is required" });
        return;
      }

      const balance = await this.getBalanceUseCase.execute(accountId);

      res.status(200).send(balance);
    } catch (err) {
      if (err instanceof AccountNotFoundError) {
        res.status(404).send(0);
        return;
      }

      res.status(500).send({ error: "Internal server error" });
    }
  }

  async reset(req: Request, res: Response) {
    try {
      await this.resetAccounts();
      res.status(200).send('OK');
    } catch (err) {
      res.status(500).send({ error: "Internal server error" });
    }
  }

  async resetAccounts(): Promise<void> {
    return this.resetAccountUseCase.execute();
  }
}
