import { IsString, IsNumber, Min, IsNotEmpty } from 'class-validator';

export class UpdateProductDto {
    @IsString()
    @IsNotEmpty()
    title?: string;

    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    price?: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    stock?: number;
}
