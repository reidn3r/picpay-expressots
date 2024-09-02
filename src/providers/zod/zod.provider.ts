import { z } from 'zod';
import { NewTransaction } from '@useCases/transaction/transaction.controller';
import { NewUser } from '@useCases/users/users.controller';
import { ROLE } from '@prisma/client';

export class ZodProvider {
    
    private newTransactionSchema = z.object({
        payerId: z.string().uuid(),
        payeeId: z.string().uuid(),
        amount: z.number().min(0),
    });
        
    private newUserSchema = z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email format"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        role: z.nativeEnum(ROLE),
        balance: z.number().min(0, "Balance must be a non-negative number").default(0),
        cpf: z.string().length(11).nullable(),
        cnpj: z.string().length(14).nullable(),
    });

    
    parseNewTransaction(data: NewTransaction): NewTransaction {
        try {
            return this.newTransactionSchema.parse(data);
        } catch (e: any) {
            throw new Error("Validation failed: " + e.errors.map((err: any) => err.message).join(", "));
        }
    }

    parseNewUser(data: NewUser): NewUser {
        try {
            return this.newUserSchema.parse(data);
        } catch (e: any) {
            throw new Error("Validation failed: " + e.errors.map((err: any) => err.message).join(", "));
        }
    }
}
