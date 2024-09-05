import { provide } from "@expressots/core";
import { Transactions } from "@prisma/client";
import { inject } from "inversify";
import { User } from "@prisma/client";
import { PrismaProvider } from "@providers/prisma/prisma.provider";
import { AxiosProvider } from "@providers/axios/axios.provider";
import { CreateTransactionDTO } from "dto/transactions/transactions.dto";

@provide(TransactionUsecase)
export class TransactionUsecase {

    private prismaProvider:PrismaProvider;
    private axiosProvider:AxiosProvider;
    
    constructor(
        @inject(PrismaProvider) prismaProvider:PrismaProvider,
        @inject(AxiosProvider) axiosProvider:AxiosProvider
    ){
        this.prismaProvider = prismaProvider;
        this.axiosProvider = axiosProvider;
    }

    async createTransaction(transaction: CreateTransactionDTO):Promise<CreateTransactionDTO | null>{
        try{
            const [ payerUser, payeeUser ] = await Promise.all([
                this.prismaProvider.findUserById(transaction.payerId),
                this.prismaProvider.findUserById(transaction.payeeId)
            ]);
    
            if (!payerUser || !payeeUser) throw new Error("Error: User not found");
            if (payerUser.role == "STOREKEEPER") throw new Error("Error: Storekeeper is not authorized to make payments");
    
            const authorized = await this.axiosProvider.isAuthorized();
            if (!authorized) throw new Error("Error: Service not authorized to make transactions");
    
            if (!this.userHasFunds(payerUser, transaction.amount)) throw new Error("Error: Payer has not sufficient funds");
    
            return this.prismaProvider.createTransaction(transaction);
        } catch (err: any) {
            console.log(err.message);
            throw new Error(err.message);
        }
    }
    
    
    private userHasFunds(user:User, value:number):boolean{
        return user.balance >= value;
    }

    async findById(id:string):Promise<Transactions | null>{
        try{
            const foundTransaction = await this.prismaProvider.findTransactionById(id);
            if(!foundTransaction) throw new Error(`Error: id: ${id} not found`);
            return foundTransaction;
        }
        catch(err:any){
            throw new Error(err.message);
        }
    }

    async findAllTransactions():Promise<Transactions[]>{
        const data = await this.prismaProvider.findAllTransactions();
        return !data ? [] : data;
    }
}