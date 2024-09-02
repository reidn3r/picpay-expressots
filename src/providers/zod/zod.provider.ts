import { z } from 'zod';
import { TransactionDTO } from '@useCases/transaction/transaction.controller';
import { UserDTO } from '@useCases/users/users.controller';
import { ROLE } from '@prisma/client';
import { provide } from '@expressots/core';

@provide(ZodProvider)
export class ZodProvider {
    
    private newTransactionSchema = z.object({
        payerId: z.string().uuid(),
        payeeId: z.string().uuid(),
        amount: z.number().min(0),
    });
        
    private newUserSchema = z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email format"),
        password: z.string().min(5, "Password must be at least 6 characters"),
        role: z.nativeEnum(ROLE),
        balance: z.number().min(0, "Balance must be a non-negative number").default(0),
        cpf: z.string().length(11).optional(),
        cnpj: z.string().length(14).optional(),
    }).refine((data) => {
        return (data.cpf && !data.cnpj) || (!data.cpf && data.cnpj);
    }, {
        message: "User must have either CPF or CNPJ, but not both",
        path: ["cpf", "cnpj"],
    });
    
    
    
    parseNewTransaction(data: TransactionDTO): TransactionDTO {
        try {
            return this.newTransactionSchema.parse(data);
        } catch (e: any) {
            throw new Error("Validation failed: " + e.errors.map((err: any) => err.message).join(", "));
        }
    }

    parseNewUser(data: UserDTO): UserDTO {
        try {
            return this.newUserSchema.parse(data);            
        } catch (err: any) {
            console.log(err.message);
            throw new Error(err.message);
        }
    }
}
