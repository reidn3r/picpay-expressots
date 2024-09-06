import { controller, Get, Post, response, body, param } from '@expressots/adapter-express';
import { BaseController, StatusCode, ValidateDTO } from '@expressots/core';
import { Response } from 'express';
import { TransactionUsecase } from './transaction.usecase';
import { CreateTransactionDTO } from 'dto/transactions/transactions.dto';
import { IndexDTO } from 'dto/transactions/index.dto';

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
            return this.callUseCaseAsync(this.useCase.createTransaction(payload), res, StatusCode.Created);
        }
        catch(err:any){
            throw new Error("Error validating input data");
        }

    }
    
    @Get("/transaction/:index")
    transactionDetails(@param('index') index:string, @response() res:Response){
        const intIndex:number = parseInt(index);
        return this.callUseCaseAsync(this.useCase.fetchTransactionsByIndex(intIndex), res, StatusCode.OK);
    }


}