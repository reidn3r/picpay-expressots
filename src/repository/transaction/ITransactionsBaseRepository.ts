
export interface ITransactionsBaseRepository<T> {

    create(data:T):Promise<T | null>;
    delete(id:String):Promise<String | null>;
    findById(id:String):Promise<T | null>;
    findAll():Promise<T[]>
    
}