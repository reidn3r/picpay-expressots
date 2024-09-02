import { ZodProvider } from "@providers/zod/zod.provider";
import { inject } from "inversify";

export class TransactionsDTO {
    amount: number;
    payeeId: string;
    payerId: string;

    private zodProvider: ZodProvider;

    constructor(
        @inject(ZodProvider) zodProvider: ZodProvider,
        data: any
    ) {
        this.zodProvider = zodProvider;

        const parsedData = this.zodProvider.parseNewTransaction(data);

        this.amount = parsedData.amount;
        this.payeeId = parsedData.payeeId;
        this.payerId = parsedData.payerId;
    }
}
