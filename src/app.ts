import "./register-aliases";

import express from "express";
import cors from "cors";
import { AccountsModule } from "./modules/accounts/accounts.module";
import { EventsModule } from "./modules/events/events.module";

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.errorHandler();
  }

  private middleware(): void {
    this.express.use(cors());
    this.express.use(express.json());
  }

  private routes(): void {
    this.express.get("/health", (req, res) => {
      res.status(200).json({
        status: "OK",
        service: "Bankly API",
        version: "1.0.0",
      });
    });

    this.express.use("/", new AccountsModule().router);
    this.express.use("/", new EventsModule().router);

    this.express.use((req, res) => {
      res.status(404).json({ error: "Route not found" });
    });
  }

  private errorHandler(): void {
    this.express.use((err: any, req: any, res: any, next: any) => {
      console.error("Unhandled error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
  }
}

const app = new App().express;
const PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => {
  console.log(`🏦 Bankly API is running on port ${PORT}`);
  console.log(`📊 Health check available at http://localhost:${PORT}/health`);
});

export default app;
