import { controller, Get, Post, request, response } from '@expressots/adapter-express';
import { BaseController, StatusCode } from '@expressots/core';
import { Request, Response } from 'express';
import { TransactionUsecase } from './transaction.usecase';

export type NewTransaction = {
    amount:number,
    payeeId:string,
    payerId:string,

}

@controller("/v1")
export class TransactionController extends BaseController{

    constructor(private useCase:TransactionUsecase){
        super();
    }

    @Post("/create/transaction")
    createTransaction(@request() req:Request, @response() res:Response){
        const { payer_id, payee_id, amount } = req.body;
        
        const newTransaction:NewTransaction = {
            amount:amount,
            payeeId:payee_id,
            payerId:payer_id,
        }

        return this.callUseCaseAsync(this.useCase.createTransaction(newTransaction), res, StatusCode.Created);
    }
    
    @Get("/transaction/:id")
    transactionDetails(@response() res:Response){
        return this.callUseCaseAsync(this.useCase.findAllTransactions(), res, StatusCode.OK);
    }


}