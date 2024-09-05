import { provide, StatusCode } from "@expressots/core";
import axios from 'axios'; 
import { IAxiosProvider } from "./IAxios.provider";
import { retryAsync } from "ts-retry";
import { request } from "http";

@provide(AxiosProvider)
export class AxiosProvider implements IAxiosProvider{

    private readonly authorizeUrl: URL = new URL("https://util.devi.tools/api/v2/authorize");
    private readonly notifyUrl: URL = new URL("https://util.devi.tools/api/v1/notify");
    private maxRetries:number = 5;
    private readonly maxDelay:number = 1000; //delay: 1s

    async isAuthorized():Promise<boolean>{
        try{
            await retryAsync(async() => {
                const request = await axios.get(this.authorizeUrl.toString());
                return request;
            },{
                delay: this.maxDelay,
                maxTry: this.maxRetries,
                until: (request) => request.status === StatusCode.OK
            });
            return true;
        }
        catch(err:any){
            return false;
        }
    }

    async notify():Promise<boolean>{
        try{
            await retryAsync(async() => {
                const request = axios.post(this.notifyUrl.toString());
                return request;
            }, {
                delay: this.maxDelay,
                maxTry: this.maxRetries,
                until: (r) => r.status === StatusCode.NoContent
            })
            return true;
        }
        catch(err:any){
            return false;
        }
    }


}