import { IsPositive, Min, IsNumber, IsOptional, IsInt } from "class-validator";

export class PaginationDTO {
    @IsNumber()
    @IsPositive()
    @IsOptional()
    @Min(1)
    limit?: number;

    @IsNumber()
    @IsInt()
    @IsOptional()
    @Min(0)
    offset?: number;
}