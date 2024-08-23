import { provide } from '@expressots/core';

@provide(ConsumerEntity)
export class ConsumerEntity {

    constructor(private id:string, private cpf:string, private userId:string){
    
    }
}