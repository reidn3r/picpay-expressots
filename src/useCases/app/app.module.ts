import { ContainerModule } from "inversify";
import { CreateModule } from "@expressots/core";
import { AppController } from "./app.controller";
import { TransactionController } from '../transaction/transaction.controller';
import { UserController } from "@useCases/users/users.controller";

export const AppModule: ContainerModule = CreateModule([AppController, TransactionController, UserController]);
