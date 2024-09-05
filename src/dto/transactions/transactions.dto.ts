import { IsNotEmpty, IsNumber, IsUUID, Min } from "class-validator";

export class CreateTransactionDTO {
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    amount: number;
    
    @IsNotEmpty()
    @IsUUID()
    payeeId: string;
    
    @IsNotEmpty()
    @IsUUID()
    payerId: string;
}
