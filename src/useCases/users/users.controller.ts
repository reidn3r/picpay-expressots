import { controller, Post, request, response } from "@expressots/adapter-express";
import { Request, Response } from "express";
import { BaseController, StatusCode } from "@expressots/core";
import { UserUsecase } from "./users.usecase";
import { ROLE, User } from "@prisma/client";
import { ZodProvider } from "@providers/zod/zod.provider";

export type NewUser = {
    name:string,
    email:string,
    password:string,
    role:ROLE,
    balance:number
    cpf?:string | null;
    cnpj?:string | null;
}

@controller("/v1")
export class UserController extends BaseController {
    private userUsecase:UserUsecase;
    private zodProvider:ZodProvider;

    constructor(
        userUsecase:UserUsecase,
        zodProvider:ZodProvider

    ){
        super();
        this.userUsecase = userUsecase;
        this.zodProvider = zodProvider;
    }

    @Post("/create/user")
    createNewUser(@request() req:Request, @response() res:Response){        
        try{
            const input_data = this.zodProvider.parseNewUser(req.body);
            return this.callUseCaseAsync(this.userUsecase.createNewUser(input_data), res, StatusCode.Created);
        }
        catch(err:any){
            throw new Error("Error validating input data");
        }
    }
}


