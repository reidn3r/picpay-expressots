import { Consumer, Storekeeper, Transactions, User } from "@prisma/client";
import { CreateTransactionDTO } from "dto/transactions/transactions.dto";
import { CreateUserDTO } from "dto/users/users.dto";

export interface IPrismaProvider {
    createTransaction(transaction: CreateTransactionDTO): Promise<CreateTransactionDTO | null>;

    findTransactionById(id:String): Promise<Transactions | null>;

    findAllTransactions(): Promise<Transactions[] | null>;

    createConsumer(data: CreateUserDTO): Promise<Consumer | null>;

    createStorekeeper(data: CreateUserDTO): Promise<Storekeeper | null>;

    findUserById(id: string): Promise<User | null>;

    findByEmail(email:string): Promise<User | null>;

    delete(id: String): Promise<String | null>;

    findAllUsers(): Promise<Consumer[]>;
}