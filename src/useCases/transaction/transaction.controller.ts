import { controller, Get, Post, response, body } from '@expressots/adapter-express';
import { BaseController, StatusCode, ValidateDTO } from '@expressots/core';
import { Response } from 'express';
import { TransactionUsecase } from './transaction.usecase';
import { CreateTransactionDTO } from 'dto/transactions/transactions.dto';

@controller("/v1")
export class TransactionController extends BaseController{
    private useCase:TransactionUsecase;

    constructor(
        useCase:TransactionUsecase,
    ){
        super();
        this.useCase = useCase;
    }

    @Post("/create/transaction", ValidateDTO(CreateTransactionDTO))
    createTransaction(@body() payload:CreateTransactionDTO, @response() res:Response){
        try{
            return res.status(StatusCode.Created).json(this.useCase.createTransaction(payload));
        }
        catch(err:any){
            throw new Error("Error validating input data");
        }

    }
    
    @Get("/transaction/:id")
    transactionDetails(@response() res:Response){
        return res.status(StatusCode.OK).json(this.useCase.findAllTransactions());
    }


}