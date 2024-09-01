import { provide } from "@expressots/core";
import { Transactions } from '@prisma/client';
import { IPrismaProvider } from "./IPrisma.provider";
import { inject } from "inversify";
import { TransactionRepository } from "repository/transaction/transactions.repository";


@provide(PrismaProvider)
export class PrismaProvider implements IPrismaProvider{
    private repository:TransactionRepository;

    constructor(@inject(TransactionRepository) repository:TransactionRepository){
        this.repository = repository;
    }

    async createTransaction(transaction:Transactions): Promise<Transactions | null> {
        return this.repository.create(transaction);
    }

    async findTransactionById(id:String): Promise<Transactions | null> {
        return this.repository.findById(id);
    }

    async findAll(): Promise<Transactions[] | null> {
        return this.repository.findAll();
    }

}