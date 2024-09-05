import { provide } from "@expressots/core";
import { IBcryptProvider } from "./IBcryptProvider";
import bcrypt from 'bcrypt';

@provide(BcryptProvider)
export class BcryptProvider implements IBcryptProvider{

    private salt:number = 10;

    async encrypt(data:string):Promise<string> {
        return await bcrypt.hash(data, this.salt);
    }
    async compare(hash:string, text:string):Promise<boolean> {
        return await bcrypt.compare(text, hash); 
    }

}