import { Consumer, Storekeeper, Transactions, User } from "@prisma/client";
import { TransactionDTO } from "@useCases/transaction/transaction.controller";
import { UserDTO } from "@useCases/users/users.controller";

export interface IPrismaProvider {
    createTransaction(transaction:TransactionDTO): Promise<TransactionDTO | null>;

    findTransactionById(id:String): Promise<Transactions | null>;

    findAllTransactions(): Promise<Transactions[] | null>;

    // createUser(data: NewUser): Promise<NewUser | null>;

    createConsumer(data: UserDTO): Promise<Consumer | null>;

    createStorekeeper(data: UserDTO): Promise<Storekeeper | null>;

    findUserById(id: string): Promise<User | null>;

    findByEmail(email:string): Promise<User | null>;

    delete(id: String): Promise<String | null>;

    findAllUsers(): Promise<Consumer[]>;
}