import { provide, StatusCode } from "@expressots/core";
import axios from 'axios'; 
import { IAxiosProvider } from "./IAxios.provider";

@provide(AxiosProvider)
export class AxiosProvider implements IAxiosProvider{

    private readonly authorizeUrl: URL = new URL("https://util.devi.tools/api/v2/authorize");
    private readonly notifyUrl: URL = new URL("https://util.devi.tools/api/v1/notify");
    private maxRetries:number = 5;
    private readonly maxDelay:number = 1000; //delay: 1s

    async isAuthorized():Promise<boolean>{
        return this.retry(async() => {
            const request = await axios.get(this.authorizeUrl.toString());
            return request.status == StatusCode.OK;
        })
    }

    async notify():Promise<boolean>{
        return this.retry(async() => {
            const request = await axios.post(this.notifyUrl.toString());
            return request.status == StatusCode.NoContent;
        });
    }

    private async retry(fn: () => Promise<boolean>, availableAttemps:number = this.maxRetries):Promise<boolean>{
        const result:boolean = await fn();
        
        if(result) return true;
        
        if(!result && availableAttemps > 0){
            await this.delay(this.maxDelay);
            return this.retry(fn, availableAttemps - 1);
        }
        else{
            return false;
        }
    }

    private async delay(timeMs:number):Promise<void>{
        return new Promise(r => setTimeout(r, timeMs));
    }

}