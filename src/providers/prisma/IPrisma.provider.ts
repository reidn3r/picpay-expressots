import { Transactions } from "@prisma/client";
import { NewTransaction } from "@useCases/transaction/transaction.controller";
export interface IPrismaProvider {
    
    createTransaction(transaction:NewTransaction): Promise<NewTransaction | null>;
    findTransactionById(id:String): Promise<Transactions | null>;
    findAll(): Promise<Transactions[] | null>;

}