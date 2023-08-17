import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsOptional, IsString, IsEnum, IsBoolean, IsArray, IsNumber } from "class-validator"
import { CreateProductImageDto } from "modules/product-image/dto/create-product-image.dto"
import { InStock } from "../../../constants"
import { BreedType } from "../../../constants"



export class CreateProductDto {
    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty()
    @IsNumber()
    mrp: number

    @ApiProperty()
    @IsNumber()
    sellingPrice: number

    @ApiProperty()
    @IsString()
    description: string

    @ApiProperty()
    @IsBoolean()
    isOnSale: boolean

    @ApiProperty()
    @IsString()
    specy: string

    @ApiProperty()
    @IsString()
    category: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    discount: number

    @ApiProperty()
    @IsOptional()
    @IsString()
    brand: string

    @ApiProperty()
    @IsOptional()
    @IsEnum(BreedType)
    breedType: BreedType

    @ApiProperty()
    @IsOptional()
    @IsEnum(InStock)
    inStock: InStock

    @ApiProperty()
    @IsArray()
    productImages: CreateProductImageDto[]

}
