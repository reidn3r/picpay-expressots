import { provide } from "@expressots/core";
import { ITransactionsBaseRepository } from "./ITransactionsBaseRepository";
import { PrismaClient, Transactions } from "@prisma/client";
import { prisma } from "db/prisma";
import { CreateTransactionDTO } from "dto/transactions/transactions.dto";

@provide(TransactionRepository)
export class TransactionRepository implements ITransactionsBaseRepository<Transactions> {

    private db:PrismaClient;
    private readonly pageElements:number = 10;

    constructor(){
        //@inject?
        this.db = prisma;
    }

    async create(data:CreateTransactionDTO):Promise<Transactions | null>{
        //Update funds and create transaction
        const [updatedPayeeFunds, updatedPayerFunds, transaction] = await prisma.$transaction([
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

    async fetchTransacionsPage(index:number):Promise<Transactions[]>{
        return await this.db.transactions.findMany({
            skip: (index && index != 1) ? index * 10 : 0,
            take: this.pageElements
        })
    }
}