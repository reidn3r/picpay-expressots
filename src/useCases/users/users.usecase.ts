import { provide } from "@expressots/core";
import { NewUser } from "./users.controller";
import { inject } from "inversify";
import { UserRepository } from "repository/users/user.repository";

@provide(UserUsecase)
export class UserUsecase {

    private userRepository:UserRepository;

    constructor(@inject(UserRepository) userRepository:UserRepository){
        this.userRepository = userRepository;
    }

    async createNewUser(user:NewUser){
        try{
            if(user.role === "CONSUMER" && user.cnpj) throw new Error("Error: Consumer is not allowed to register a CNPJ");
            if(user.role === "STOREKEEPER" && user.cpf) throw new Error("Error: Storekeeper is not allowed to register a CPF");
            
            if(user.cpf && this.isConsumer(user)){
                return await this.userRepository.createConsumer(user);
            }

            if(user.cnpj && this.isStorekeeper(user)){
                return await this.userRepository.createStorekeeper(user);
            }

            throw new Error("Error: error while creating new user");
        }
        catch(err:any){
            throw new Error(err.message);
        }
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