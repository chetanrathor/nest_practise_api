import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Order } from "../../constants";

export class FilterDto {
    @ApiProperty()
    @IsString()
    limit: string

    @ApiProperty()
    @IsString()
    offset: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    search: string

    @ApiProperty({ enum: Order })
    @IsEnum(Order)
    order: Order


}