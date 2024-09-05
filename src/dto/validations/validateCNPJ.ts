import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: "ValidateCNPJ", async: false })
export class ValidateCNPJ implements ValidatorConstraintInterface {
    validate(cnpj: string | null) {
        return cnpj?.length === 14;
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return "Invalid CNPJ format";
    }
}
