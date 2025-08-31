import { Request, Response } from "express";
import { IAccountRepository } from "@/modules/accounts/application/repositories/account-repository";
import { ProcessEventUseCase } from "../../application/usecases/process-event.usecase";
import { BankEvent } from "../../domain/types/bank-event";
import { AccountNotFoundError } from "@/modules/accounts/domain/errors/account-not-found.error";

export class EventsController {
  private processEventUseCase: ProcessEventUseCase;

  constructor(private accountRepository: IAccountRepository) {
    this.processEventUseCase = new ProcessEventUseCase(this.accountRepository);
  }

  async handleEvent(req: Request, res: Response) {
    try {
      const event = req.body as BankEvent;

      const result = await this.processEventUseCase.execute(event);

      res.status(200).json(result);
    } catch (err) {
      if (err instanceof AccountNotFoundError) {
        res.status(404).json(0);
      }

      res.status(500).json({ message: "Internal server error" });
    }
  }
}
