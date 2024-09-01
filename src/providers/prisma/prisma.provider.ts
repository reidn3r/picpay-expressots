import { provide } from "@expressots/core";
import { Transactions } from '@prisma/client';
import { IPrismaProvider } from "./IPrisma.provider";
import { inject } from "inversify";
import { TransactionRepository } from "repository/transaction/transactions.repository";
import { NewTransaction } from "@useCases/transaction/transaction.controller";


@provide(PrismaProvider)
export class PrismaProvider implements IPrismaProvider{
    private transactionRepository:TransactionRepository;

    constructor(
        @inject(TransactionRepository) repository:TransactionRepository,

    ){
        this.transactionRepository = repository;
    }

    async createTransaction(transaction:NewTransaction): Promise<NewTransaction | null> {
        return this.transactionRepository.create(transaction);
    }

    async findTransactionById(id:String): Promise<Transactions | null> {
        return this.transactionRepository.findById(id);
    }

    async findAll(): Promise<Transactions[] | null> {
        return this.transactionRepository.findAll();
    }

}