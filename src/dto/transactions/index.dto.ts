import { Type } from "class-transformer";
import { IsNotEmpty, IsNumberString, Min } from "class-validator";

export class IndexDTO {
    @IsNotEmpty()
    @Type(() => Number)
    index:number;
}