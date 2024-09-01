import { controller, Post, request, response } from "@expressots/adapter-express";
import { Request, Response } from "express";
import { BaseController, StatusCode } from "@expressots/core";
import { UserUsecase } from "./users.usecase";
import { ROLE } from "@prisma/client";

export type NewUser = {
    name:string,
    email:string,
    password:string,
    role:ROLE,
    balance:number
    cpf:string | null;
    cnpj:string | null;
}

@controller("/v1")
export class UserController extends BaseController {
    private userUsecase:UserUsecase;

    constructor(userUsecase:UserUsecase){
        super();
        this.userUsecase = userUsecase;
    }

    @Post("/create/user")
    createNewUser(@request() req:Request, @response() res:Response){
        const { email, name, password, role, cpf, cnpj, balance } = req.body;
        const newUser:NewUser = { 
                email, name, password, 
                role, cpf, cnpj, balance
        };

        return this.callUseCase(this.userUsecase.createNewUser(newUser), res, StatusCode.Created);
    }
}


