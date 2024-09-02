
export interface IAxiosProvider {
    isAuthorized():Promise<boolean>,
    notify():Promise<boolean>,
}