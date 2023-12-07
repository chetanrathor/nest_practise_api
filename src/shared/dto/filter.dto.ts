import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";
import { Order } from "../../constants";

export class FilterDto {
    @ApiProperty()
    @IsNumberString()    
    limit: number

    @ApiProperty()
    @IsNumberString()    
    offset: number

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    search: string

    @ApiProperty({ enum: Order })
    @IsEnum(Order)
    order: Order


}