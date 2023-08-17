import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { BreedType } from "../../../constants";
import { FilterDto } from "shared/dto/filter.dto";

export class GetProductsRequest extends FilterDto {

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    specy: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    category: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    startPrice: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    endPrice: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    discount: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    brand: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsEnum(BreedType)
    breedType: BreedType



}