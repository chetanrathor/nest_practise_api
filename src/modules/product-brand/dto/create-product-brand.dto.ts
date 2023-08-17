import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateProductBrandDto {
    @ApiProperty()
    @IsString()
    name:string
    
}
