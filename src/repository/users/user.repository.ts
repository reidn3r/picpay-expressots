import { prisma } from "db/prisma";
import { Consumer, PrismaClient, User, Storekeeper } from "@prisma/client";
import { IUserBaseRepository } from "./IUsersBaseRepository";
import { provide } from "@expressots/core";

@provide(UserRepository)
export class UserRepository implements IUserBaseRepository<User>{

    private db:PrismaClient;

    constructor(){
        this.db = prisma;
    }

    async createUser(data:User): Promise<User | null>{
        return this.db.user.create({ data });
    }

    async createConsumer(data:Consumer): Promise<Consumer | null>{
        return this.db.consumer.create({ data });
    }

    async createStorekeeper(data:Storekeeper): Promise<Storekeeper | null>{
        return this.db.storekeeper.create({ data });
    }
    
    async findUserById(id:string):Promise<User | null>{
        return this.db.user.findUnique({
            where:{ id }
        })
    }

    async delete(id:String):Promise<String | null>{
        return null;
    }

    async findAll():Promise<User[]>{
        return this.db.user.findMany();
    }
}