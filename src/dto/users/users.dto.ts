import { ROLE } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, Min, MinLength, Validate, ValidateIf } from "class-validator";
import { ValidateCPF } from '../validations/validateCPF';
import { ValidateCNPJ } from '../validations/validateCNPJ';

class CreateUserDTO {
    @IsNotEmpty()
    @MinLength(1)
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
    
    @IsNotEmpty()
    @IsEnum(ROLE)
    role: ROLE;
    
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    balance: number;
    
    @ValidateIf(o => !o.cnpj && o.cpf) 
    //condição deve retornar false para realizar validação
    
    @IsOptional()
    @Validate(ValidateCPF, {
        message: "Invalid CPF format"
    })
    cpf: string | null;
    
    @ValidateIf(o => !o.cpf && o.cnpj)
    //condição deve retornar false para realizar validação
    @Validate(ValidateCNPJ, {
        message: "Invalid CNPJ format"
    })
    cnpj: string | null;
}

export { CreateUserDTO };
