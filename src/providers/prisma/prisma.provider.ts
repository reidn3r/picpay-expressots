import { provide } from "@expressots/core";
import { Consumer, Storekeeper, Transactions, User } from '@prisma/client';
import { IPrismaProvider } from "./IPrisma.provider";
import { inject } from "inversify";
import { TransactionRepository } from "repository/transaction/transactions.repository";
import { AxiosProvider } from "@providers/axios/axios.provider";
import { UserRepository } from "repository/users/user.repository";
import { CreateTransactionDTO } from "dto/transactions/transactions.dto";
import { CreateUserDTO } from "dto/users/users.dto";

@provide(PrismaProvider)
export class PrismaProvider implements IPrismaProvider{
    private transactionRepository:TransactionRepository;
    private userRepository:UserRepository;
    private axiosProvider:AxiosProvider;

    constructor(
        @inject(TransactionRepository) repository:TransactionRepository,
        @inject(UserRepository) userRepository:UserRepository,
        @inject(AxiosProvider) axiosProvider:AxiosProvider

    ){
        this.transactionRepository = repository;
        this.userRepository = userRepository;
        this.axiosProvider = axiosProvider;
    }

    async createTransaction(transaction:CreateTransactionDTO): Promise<CreateTransactionDTO | null> {
        const newTransaction:CreateTransactionDTO | null = await this.transactionRepository.create(transaction);
        this.axiosProvider.notify();
        return newTransaction;
    }

    async findTransactionById(id:String): Promise<Transactions | null> {
        return this.transactionRepository.findById(id);
    }

    async findAllTransactions(): Promise<Transactions[] | null> {
        return this.transactionRepository.findAll();
    }

    async createConsumer(data: CreateUserDTO): Promise<Consumer | null> {
        try{
            if (data.cpf) return await this.userRepository.createConsumer(data);
            return null;
        }
        catch(err:any){
            console.log(err.message);
            throw new Error(err.message);
        }
    }
    
    async createStorekeeper(data: CreateUserDTO): Promise<Storekeeper | null> {
        if(data.cnpj){
            return await this.userRepository.createStorekeeper(data);
        }
        return null;
        
    }

    async findUserById(id: string): Promise<User | null> {
        return await this.userRepository.findUserById(id);
    }

    async findByEmail(email:string): Promise<User | null>{
        return await this.userRepository.findByEmail(email);
    }

    async delete(id: String): Promise<String | null> {
        return this.userRepository.delete(id);
    }

    async findAllUsers(): Promise<Consumer[]> {
        return await this.userRepository.findAll();
    }


}