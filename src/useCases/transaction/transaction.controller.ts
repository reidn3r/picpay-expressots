import { controller, Get, Post, request, response } from '@expressots/adapter-express';
import { BaseController } from '@expressots/core';
import { Request, Response } from 'express';
import { TransactionUsecase } from './transaction.usecase';

@controller("/v1")
export class TransactionController extends BaseController{

    constructor(private useCase:TransactionUsecase){
        super();
    }

    @Post("/create/transaction")
    execute(@request() req:Request, @response() res:Response){
        const { payer_id, payee_id, amount } = req.body;

        return this.callUseCase(this.useCase.newTransaction(payer_id, payee_id, amount), res, 201);
    }

    @Get("/transaction/:id")
    transactionDetails(){
        return;
    }


}