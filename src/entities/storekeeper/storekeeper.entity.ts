import { provide } from '@expressots/core';

@provide(StorekeeperEntity)
export class StorekeeperEntity {
    constructor(private id:string, private cnpj:string, private userId:string){}
    
}