import { Router } from "express";
import { AccountsRoutes } from "./api/routes/account.routes";

export class AccountsModule {
  public router: Router;

  constructor() {
    this.router = new AccountsRoutes().router;
  }
}
