import { provide } from "@expressots/core";
import { inject } from "inversify";
import { PrismaProvider } from "@providers/prisma/prisma.provider";
import { CreateUserDTO } from "dto/users/users.dto";
import { BcryptProvider } from "@providers/bcrypt/bcrypt.provider";

@provide(UserUsecase)
export class UserUsecase {
    
    private readonly storekeeperRole:string = "STOREKEEPER";
    private readonly consumerRole:string = "CONSUMER";
    private prismaProvider:PrismaProvider;
    private bcryptProvider:BcryptProvider;

    constructor(
        @inject(PrismaProvider) prismaProvider:PrismaProvider,
        @inject(BcryptProvider) bcryptProvider:BcryptProvider
    ){
        this.prismaProvider = prismaProvider;
        this.bcryptProvider = bcryptProvider;
    }

    async createNewUser(user:CreateUserDTO){
        try{
            if(user.role === this.consumerRole && user.cnpj) throw new Error("Error: Consumer is not allowed to register a CNPJ");
            if(user.role === this.storekeeperRole && user.cpf) throw new Error("Error: Storekeeper is not allowed to register a CPF");
            
            const foundUser = await this.userExists(user);
            if(foundUser) throw new Error("Error: User already exists");

            //encrypt user password
            user = await this.hashPassword(user);
            
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

    private async userExists(user: CreateUserDTO):Promise<boolean>{
        const foundUser = await this.prismaProvider.findByEmail(user.email);
        return foundUser ? true : false;
    }
    
    private isConsumer(user: CreateUserDTO):boolean{
        if(!user.role || user.role == this.storekeeperRole) return false;
        if(user.role === this.consumerRole && user.cnpj) return false;
        if(user.role === this.consumerRole && user.cpf && user.cnpj) return false;
        if(user.role === this.consumerRole && user.cpf) return true;
        return false;
    }
    private isStorekeeper(user: CreateUserDTO):boolean{
        if(!user.role || user.role == this.consumerRole) return false;
        if(user.role === this.storekeeperRole && user.cpf) return false;
        if(user.role === this.storekeeperRole && user.cpf && user.cnpj) return false;
        if(user.role === this.storekeeperRole && user.cnpj) return true;
        return false;
    }

    private async hashPassword(user:CreateUserDTO):Promise<CreateUserDTO>{
        const hashPassword:string = await this.bcryptProvider.encrypt(user.password);
        return { ...user, password:hashPassword };
        
    }
}