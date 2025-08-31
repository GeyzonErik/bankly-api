import { Router } from "express";
import { EventsController } from "../controllers/events.controller";
import { InMemoryAccountRepository } from "@/modules/accounts/data/repositories/in-memory-account.repository";

export class EventsRoutes {
  public router: Router;
  private eventsController: EventsController;

  constructor() {
    this.router = Router();

    const accountRepository = InMemoryAccountRepository.getInstance();
    this.eventsController = new EventsController(accountRepository);

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      "/event",
      this.eventsController.handleEvent.bind(this.eventsController)
    );
  }
}
