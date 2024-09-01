import { provide } from "@expressots/core";
import { TransactionRepository } from "repository/transaction/transactions.repository";
import { Transactions } from "@prisma/client";
import { NewTransaction } from "./transaction.controller";
import { inject } from "inversify";
import { User } from "@prisma/client";
import { UserRepository } from "repository/users/user.repository";
import { PrismaProvider } from "@providers/prisma/prisma.provider";

@provide(TransactionUsecase)
export class TransactionUsecase {

    private transactionRepository:TransactionRepository;
    private userRepository:UserRepository;
    private prismaProvider:PrismaProvider;
    
    constructor(
        @inject(TransactionRepository) transactionRepository:TransactionRepository,
        @inject(UserRepository) userRepository:UserRepository,
        @inject(PrismaProvider) prismaProvider:PrismaProvider
    ){
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
        this.prismaProvider = prismaProvider;
    }

    async createTransaction(transaction:NewTransaction):Promise<NewTransaction | null>{
        try{
            const [ payerUser, payeeUser ] = await Promise.all([
                this.userRepository.findUserById(transaction.payerId),
                this.userRepository.findUserById(transaction.payeeId),
            ]);
    
            if(!payerUser || !payeeUser) throw new Error("Error: User not found");
            if(payerUser.role == "STOREKEEPER") throw new Error("Error: Storekeeper is not authorized to make payments");
            return this.prismaProvider.createTransaction(transaction);
        }
        catch(err:any){
            throw new Error(err.message);
        }
    }

    userHasFunds(user:User, value:number):boolean{
        return user.balance >= value;
    }

    async findById(id:string):Promise<Transactions | null>{
        try{
            const foundTransaction = await this.transactionRepository.findById(id);
            if(!foundTransaction) throw new Error(`Error: id: ${id} not found`);
            return foundTransaction;
        }
        catch(err:any){
            throw new Error(err.message);
        }
    }

    async findAllTransactions():Promise<Transactions[]>{
        return this.transactionRepository.findAll();
    }
}