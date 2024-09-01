import { inject } from "inversify";
import { TransactionRepository } from "repository/transaction/transactions.repository";
import { IBaseTransactionsServices } from "./IBaseTransactions.services";
import { Transactions } from "@prisma/client";
import { provide } from "@expressots/core";

@provide(TransactionServices)
export class TransactionServices implements IBaseTransactionsServices {
    
    private repository:TransactionRepository;

    constructor(@inject(TransactionRepository) transactionRepository:TransactionRepository){
        this.repository = transactionRepository;
    }

    async createTransaction(transaction:Transactions):Promise<Transactions | null>{
        return this.repository.create(transaction);
    }

    async findById(id:string):Promise<Transactions | null>{
        return this.repository.findById(id);
    }

    async findAllTransactions():Promise<Transactions[]>{
        return this.repository.findAll();
    }
}