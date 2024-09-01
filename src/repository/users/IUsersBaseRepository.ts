import { User, Consumer, Storekeeper } from "@prisma/client";
import { NewUser } from "@useCases/users/users.controller";

export interface IUserBaseRepository<T> {

    createUser(data:T):Promise<T | null>;
    createConsumer(data: NewUser):Promise<Consumer | null>;
    createStorekeeper(data:NewUser):Promise<Storekeeper | null>;
    findByEmail(email:string): Promise<User | null>;
    delete(id:String):Promise<String | null>;
    findUserById(id:String):Promise<T | null>;
    findAll():Promise<T[]>
    
}