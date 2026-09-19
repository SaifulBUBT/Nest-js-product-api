import { IsOptional, IsString, IsNumber, Min } from 'class-validator';

export class PatchProductDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsNumber()
    @Min(0)
    @IsOptional()
    price?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    stock?: number;
}
