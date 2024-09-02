import { provide } from "@expressots/core";
import { NewUser } from "./users.controller";
import { inject } from "inversify";
import { PrismaProvider } from "@providers/prisma/prisma.provider";

@provide(UserUsecase)
export class UserUsecase {

    private prismaProvider:PrismaProvider;

    constructor(
        @inject(PrismaProvider) prismaProvider:PrismaProvider,
    ){
        this.prismaProvider = prismaProvider;
    }

    async createNewUser(user:NewUser){
        try{
            if(user.role === "CONSUMER" && user.cnpj) throw new Error("Error: Consumer is not allowed to register a CNPJ");
            if(user.role === "STOREKEEPER" && user.cpf) throw new Error("Error: Storekeeper is not allowed to register a CPF");
            
            const foundUser = await this.userExists(user);
            if(foundUser) throw new Error("Error: User already exists");

            if(user.cpf && this.isConsumer(user)){
                return await this.prismaProvider.createConsumer(user);
            }

            if(user.cnpj && this.isStorekeeper(user)){
                return await this.prismaProvider.createStorekeeper(user);
            }

            throw new Error("Error: error while creating new user");
        }
        catch(err:any){
            console.log(err.message);
            throw new Error(err.message);
        }
    }

    private async userExists(user:NewUser):Promise<boolean>{
        const foundUser = await this.prismaProvider.findByEmail(user.email);
        return foundUser ? true : false;
    }
    
    private isConsumer(user:NewUser):boolean{
        if(!user.role || user.role == "STOREKEEPER") return false;
        if(user.role === "CONSUMER" && user.cnpj) return false;
        if(user.role === "CONSUMER" && user.cpf && user.cnpj) return false;
        if(user.role === "CONSUMER" && user.cpf) return true;
        return false;
    }
    private isStorekeeper(user:NewUser):boolean{
        if(!user.role || user.role == "CONSUMER") return false;
        if(user.role === "STOREKEEPER" && user.cpf) return false;
        if(user.role === "STOREKEEPER" && user.cpf && user.cnpj) return false;
        if(user.role === "STOREKEEPER" && user.cnpj) return true;
        return false;
    }
}