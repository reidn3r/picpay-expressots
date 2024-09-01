import { provide } from "@expressots/core";
import { TransactionRepository } from "repository/transaction/transactions.repository";
import { Transactions } from "@prisma/client";
import { NewTransaction } from "./transaction.controller";
import { inject } from "inversify";
import { UserRepository } from "repository/users/user.repository";

@provide(TransactionUsecase)
export class TransactionUsecase {

    private transactionRepository:TransactionRepository;
    private userRepository:UserRepository;
    
    constructor(
        @inject(TransactionRepository) transactionRepository:TransactionRepository,
        @inject(UserRepository) userRepository:UserRepository
    ){
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
    }

    async createTransaction(transaction:NewTransaction):Promise<Transactions | null>{
        const [ payerUser, payeeUser ] = await Promise.all([
            this.userRepository.findUserById(transaction.payerId),
            this.userRepository.findUserById(transaction.payeeId),
        ]);

        if(!payerUser || !payeeUser || payerUser.role == "STOREKEEPER") return null;
        return this.transactionRepository.create(transaction);
    }

    async findById(id:string):Promise<Transactions | null>{
        return this.transactionRepository.findById(id);
    }

    async findAllTransactions():Promise<Transactions[]>{
        return this.transactionRepository.findAll();
    }
}