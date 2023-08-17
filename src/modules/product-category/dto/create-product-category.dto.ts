import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateProductCategoryDto {
    @ApiProperty()
    @IsString()
    name: string
}
