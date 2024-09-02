import { Consumer, Storekeeper, Transactions, User } from "@prisma/client";
import { NewTransaction } from "@useCases/transaction/transaction.controller";
import { NewUser } from "@useCases/users/users.controller";

export interface IPrismaProvider {
    createTransaction(transaction:NewTransaction): Promise<NewTransaction | null>;

    findTransactionById(id:String): Promise<Transactions | null>;

    findAllTransactions(): Promise<Transactions[] | null>;

    // createUser(data: NewUser): Promise<NewUser | null>;

    createConsumer(data: NewUser): Promise<Consumer | null>;

    createStorekeeper(data: NewUser): Promise<Storekeeper | null>;

    findUserById(id: string): Promise<User | null>;

    findByEmail(email:string): Promise<User | null>;

    delete(id: String): Promise<String | null>;

    findAllUsers(): Promise<Consumer[]>;
}