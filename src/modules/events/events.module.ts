import { Router } from "express";
import { EventsRoutes } from "./api/routes/events.routes";

export class EventsModule {
  public router: Router;

  constructor() {
    this.router = new EventsRoutes().router;
  }
}
