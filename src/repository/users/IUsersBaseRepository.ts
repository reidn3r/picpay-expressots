import { User, Consumer, Storekeeper } from "@prisma/client";
import { CreateUserDTO } from "dto/users/users.dto";

export interface IUserBaseRepository<T> {

    // createUser(data:T):Promise<T | null>;
    createConsumer(data:CreateUserDTO):Promise<Consumer | null>;
    createStorekeeper(data:CreateUserDTO):Promise<Storekeeper | null>;
    findByEmail(email:string): Promise<User | null>;
    delete(id:String):Promise<String | null>;
    findUserById(id:String):Promise<User | null>;
    findAll():Promise<T[]>
    
}