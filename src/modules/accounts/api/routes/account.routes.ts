import { Router } from "express";
import { AccountsController } from "../controllers/account.controller";
import { InMemoryAccountRepository } from "../../data/repositories/in-memory-account.repository";

export class AccountsRoutes {
  public router: Router;
  private accountsController: AccountsController;

  constructor() {
    this.router = Router();

    const accountRepository = InMemoryAccountRepository.getInstance();
    this.accountsController = new AccountsController(accountRepository);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      "/list",
      this.accountsController.listAccounts.bind(this.accountsController)
    );

    this.router.post(
      "/reset",
      this.accountsController.reset.bind(this.accountsController)
    );

    this.router.get(
      "/balance",
      this.accountsController.getBalance.bind(this.accountsController)
    );
  }
}
