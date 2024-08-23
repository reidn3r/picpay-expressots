import { provide } from "@expressots/core";

@provide(UserEntity)
export class UserEntity {
    private id: string;
    private name:string;
    private password:string;
    private role:string;
    private balance:number;

    constructor(id:string, name:string, password:string, role:string, balance:number) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.role = role;
        this.balance = balance;
    }
}
