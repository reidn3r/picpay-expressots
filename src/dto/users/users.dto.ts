import { ROLE } from "@prisma/client";
import { ZodProvider } from "@providers/zod/zod.provider";
import { inject } from "inversify";

export class UserDTO {
    name: string;
    email: string;
    password: string;
    role: ROLE;
    balance: number;
    cpf: string | null;
    cnpj: string | null;

    private zodProvider:ZodProvider;

    constructor(
            @inject(ZodProvider) zodProvider:ZodProvider,
            data:any,
            ) {
                this.zodProvider = zodProvider;
                const parsedData = this.zodProvider.parseNewUser(data);

        this.name = parsedData.name;
        this.email = parsedData.email;
        this.password = parsedData.password;
        this.role = parsedData.role;
        this.balance = parsedData.balance;
        this.cpf = parsedData.cpf;
        this.cnpj = parsedData.cnpj;
    }
}
