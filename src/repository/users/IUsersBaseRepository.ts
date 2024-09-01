import { Consumer, Storekeeper } from "@prisma/client";

export interface IUserBaseRepository<T> {

    createUser(data:T):Promise<T | null>;
    createConsumer(data: Consumer):Promise<Consumer | null>;
    createStorekeeper(data:Storekeeper):Promise<Storekeeper | null>;
    delete(id:String):Promise<String | null>;
    findUserById(id:String):Promise<T | null>;
    findAll():Promise<T[]>
    
}