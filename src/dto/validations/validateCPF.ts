import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: "ValidateCPF", async: false })
export class ValidateCPF implements ValidatorConstraintInterface {
    validate(cpf: string | null) {
        return cpf?.length === 11;
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return "Invalid CPF format";
    }
}
