
export interface IBcryptProvider {
    encrypt(data:string): Promise<string>;
    compare(hash:string, text:string): Promise<boolean>;
}