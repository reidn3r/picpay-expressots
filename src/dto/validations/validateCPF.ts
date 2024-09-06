import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: "ValidateCPF", async: false })
export class ValidateCPF implements ValidatorConstraintInterface {
    validate(cpf: string | null) {
        if (!cpf || cpf.length !== 11) return false;
        let digits:number[] = cpf.split("").map(Number);
        let sum:number = 0;
        let q:number = 0;
    
        for(let i=10; i > 1; i--){
            sum += digits[10-i] * i;
        }
        
        q = (sum * 10) % 11 == 10 ? 0 : (sum * 10) % 11;
        if(q != digits[9]) return false;
        
        sum = 0;
        for(let i = 11; i > 1; i--){
            sum += digits[11-i]*i;
        }
        q = (sum * 10) % 11 == 10 ? 0 : (sum * 10) % 11;
        if(q != digits[10]) return false;
        return true;
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return "Invalid CPF format";
    }
}
