import { ContainerModule } from "inversify";
import { CreateModule } from "@expressots/core";
import { AppController } from "./app.controller";
import { TransactionController } from './transaction.controller';

export const AppModule: ContainerModule = CreateModule([AppController, TransactionController]);
