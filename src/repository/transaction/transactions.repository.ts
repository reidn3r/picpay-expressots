import { provide } from "@expressots/core";
import { ITransactionsBaseRepository } from "./ITransactionsBaseRepository";
import { PrismaClient, Transactions } from "@prisma/client";
import { NewTransaction } from "@useCases/transaction/transaction.controller";
import { prisma } from "db/prisma";

@provide(TransactionRepository)
export class TransactionRepository implements ITransactionsBaseRepository<Transactions> {

    private db:PrismaClient;

    constructor(){
        //@inject?
        this.db = prisma;
    }

    async create(data:NewTransaction):Promise<Transactions | null>{
        return await this.db.transactions.create({
            data:{
                payeeId: data.payeeId,
                payerId: data.payerId,
                amount: data.amount
            }}
        );
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