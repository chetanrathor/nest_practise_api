import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateProductImageDto {

    @ApiProperty()
    @IsString()
    link: string
}
