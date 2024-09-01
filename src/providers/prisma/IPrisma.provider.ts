import { Transactions } from "@prisma/client";
export interface IPrismaProvider {
    
    createTransaction(transaction:Transactions): Promise<Transactions | null>;
    findTransactionById(id:String): Promise<Transactions | null>;
    findAll(): Promise<Transactions[] | null>;

}