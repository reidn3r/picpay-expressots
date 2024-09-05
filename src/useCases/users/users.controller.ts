import { controller, Post, response, body } from "@expressots/adapter-express";
import { Response } from "express";
import { BaseController, StatusCode } from "@expressots/core";
import { UserUsecase } from "./users.usecase";
import { ValidateDTO } from "@expressots/core";
import { CreateUserDTO } from "dto/users/users.dto";

@controller("/v1")
export class UserController extends BaseController {
    private userUsecase:UserUsecase;
    constructor(
        userUsecase:UserUsecase,
    ){
        super();
        this.userUsecase = userUsecase;
    }

    @Post("/create/user", ValidateDTO(CreateUserDTO))
    createNewUser(@body() payload:CreateUserDTO,  @response() res:Response){        
        try{
            return res.status(StatusCode.Created).json(this.userUsecase.createNewUser(payload));
        }
        catch(err:any){
            throw new Error("Error validating input data");
        }
    }
}


