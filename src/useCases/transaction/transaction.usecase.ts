import { provide } from "@expressots/core";

@provide(TransactionUsecase)
export class TransactionUsecase {
    
    newTransaction(payer_id:string, payee_id:string, amount:number){
        return "ok";
    }
}