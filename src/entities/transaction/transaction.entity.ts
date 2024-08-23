import { provide } from '@expressots/core';

@provide(TransactionEntity)
export class TransactionEntity {
    private id:string;
    private payer_id:string;
    private payee_id:string;
    private amount:number;
    private createdAt:string;
    
    constructor(id:string, payer_id:string, payee_id:string, amount:number, createdAt:string){
        this.id = id;
        this.payee_id = payee_id;
        this.payer_id = payer_id;
        this.amount = amount;
        this.createdAt = createdAt;
    }
}