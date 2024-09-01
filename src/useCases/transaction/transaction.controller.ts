import { controller, Get, Post, request, response } from '@expressots/adapter-express';
import { BaseController } from '@expressots/core';
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

        return this.callUseCase(this.useCase.createTransaction(newTransaction), res, 201);
    }
    
    @Post("/create/user")
    createUser(@request() req:Request, @response() res:Response){
        // const { payer_id, payee_id, amount } = req.body;
        
        // const newTransaction:NewTransaction = {
        //     amount:amount,
        //     payeeId:payee_id,
        //     payerId:payer_id,
        // }

        // return this.callUseCase(this.useCase.createTransaction(newTransaction), res, 201);
    }

    @Get("/transaction/:id")
    transactionDetails(@response() res:Response){
        return this.callUseCase(this.useCase.findAllTransactions(), res, 200);
    }


}