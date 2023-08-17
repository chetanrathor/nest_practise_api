import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateProductRatingDto {
    @ApiProperty({})
    @IsNumber()
    rating: number;
}
