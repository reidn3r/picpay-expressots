import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: "ValidateCPF", async: false })
export class ValidateCPF implements ValidatorConstraintInterface {
    validate(cpf: string | null) {
        if (!cpf || cpf.length !== 11) return false;
        let digits:number[] = cpf.split("").map(Number);
        let sum:number = 0;
    
        let q = this.sumDigits(digits, 10, 1);
        q = (sum * 10) % 11 == 10 ? 0 : (sum * 10) % 11;
        if(q != digits[9]) return false;
        
        
        q = this.sumDigits(digits, 11, 1);
        q = (sum * 10) % 11 == 10 ? 0 : (sum * 10) % 11;
        if(q != digits[10]) return false;
        
        return true;
    }
    
    defaultMessage(validationArguments?: ValidationArguments): string {
        return "Invalid CPF format";
    }
    
    
    private sumDigits(digits:number[], startIndex:number, endIndex:number):number{
        let sum=0;
        for(let i=startIndex; i > endIndex; i--){
            sum += digits[startIndex-i] * i;
        }
        return sum;
    }
}
