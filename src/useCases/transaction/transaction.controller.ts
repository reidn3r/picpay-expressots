import { controller, Get, Post, request, response } from '@expressots/adapter-express';
import { BaseController, StatusCode } from '@expressots/core';
import { Request, Response } from 'express';
import { TransactionUsecase } from './transaction.usecase';
import { ZodProvider } from '@providers/zod/zod.provider';

export type TransactionDTO = {
    amount:number,
    payeeId:string,
    payerId:string,
}

@controller("/v1")
export class TransactionController extends BaseController{
    private useCase:TransactionUsecase;
    private zodProvider:ZodProvider;

    constructor(
        useCase:TransactionUsecase,
        zodProvider:ZodProvider
    ){
        super();
        this.useCase = useCase;
        this.zodProvider = zodProvider;
    }

    @Post("/create/transaction")
    createTransaction(@request() req:Request, @response() res:Response){
        try{
            const newTransaction = this.zodProvider.parseNewTransaction(req.body);
            return this.callUseCaseAsync(this.useCase.createTransaction(newTransaction), res, StatusCode.Created);
        }
        catch(err:any){
            throw new Error("Error validating input data");
        }

    }
    
    @Get("/transaction/:id")
    transactionDetails(@response() res:Response){
        return this.callUseCaseAsync(this.useCase.findAllTransactions(), res, StatusCode.OK);
    }


}