import { provide } from "@expressots/core";
import { ITransactionsBaseRepository } from "./ITransactionsBaseRepository";
import { PrismaClient, Transactions } from "@prisma/client";
import { TransactionDTO } from "@useCases/transaction/transaction.controller";
import { prisma } from "db/prisma";

@provide(TransactionRepository)
export class TransactionRepository implements ITransactionsBaseRepository<Transactions> {

    private db:PrismaClient;

    constructor(){
        //@inject?
        this.db = prisma;
    }

    async create(data:TransactionDTO):Promise<Transactions | null>{
        //Update funds and create transaction
        const [updatedPayeeFunds, updatedPayerFunds, transaction] = await Promise.all([
            this.db.user.update({
                where: { id: data.payeeId },
                data:{ balance : { increment: data.amount } }
            }),
            this.db.user.update({
                where: { id: data.payerId },
                data:{ balance : { decrement: data.amount } }
            }),
            this.db.transactions.create({
                data:{ payeeId: data.payeeId, payerId: data.payerId, amount: data.amount }
            })
        ])
        return transaction;
    }
    
    async delete(id:String):Promise<String | null>{
        // const deleted = await this.provider.delete()
        return null;
    }
    
    async findById(id:String):Promise<Transactions | null>{
        return await this.db.transactions.findUnique({
            where:{
                id: String(id)
            }
        })
    }
    async findAll():Promise<Transactions[]>{
        return await this.db.transactions.findMany();
    }
}