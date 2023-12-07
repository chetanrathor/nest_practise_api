import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateCartDto {

    @ApiProperty()
    @IsString()
    @IsUUID()
    @IsNotEmpty()
    product: string

    @ApiProperty()
    @IsString()
    @IsUUID()
    @IsNotEmpty()
    user: string

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    quantity: number
}
