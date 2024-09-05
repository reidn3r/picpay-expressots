import { User, Storekeeper, Consumer, PrismaClient } from "@prisma/client";
import { UserDTO } from "@useCases/users/users.controller";
import { IUserBaseRepository } from "./IUsersBaseRepository";
import { provide } from "@expressots/core";
import { prisma } from "db/prisma";
import { CreateUserDTO } from "dto/users/users.dto";

@provide(UserRepository)
export class UserRepository implements IUserBaseRepository<Consumer> {

    private db: PrismaClient;

    constructor() {
        this.db = prisma;
    }

    async createConsumer(data: UserDTO): Promise<Consumer | null> {
        if (data.cpf) {
            return await this.db.consumer.create({
                data: {
                    cpf: data.cpf,
                    user: {
                        create: {
                            email: data.email,
                            name: data.name,
                            password: data.password,
                            balance: data.balance > 0 ? data.balance : 0.0
                        }
                    }
                }
            });
        }
        return null;
    }
    
    async createStorekeeper(data: UserDTO): Promise<Storekeeper | null> {
        if(data.cnpj){
            return await this.db.storekeeper.create({
                data:{
                    cnpj: data.cnpj,
                    user:{
                        create:{
                            email: data.email,
                            name: data.name,
                            password: data.password,
                            role: data.role,
                            balance: data.balance > 0 ? data.balance : 0.0
                        }
                    }
                }
            })
        }
        return null;
        
    }

    async findUserById(id: string): Promise<User | null> {
        return await this.db.user.findUnique({
            where: { id }
        });
    }

    async findByEmail(email:string): Promise<User | null>{
        return await this.db.user.findUnique({
            where: {
                email
            }
        })
    }

    async delete(id: String): Promise<String | null> {
        return null;
    }

    async findAll(): Promise<Consumer[]> {
        return await this.db.consumer.findMany();
    }
}
