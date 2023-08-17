import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsePipes } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductBrandDto } from './dto/create-product-brand.dto';
import { GetProductBrandsRequest } from './dto/get-product-brands';
import { UpdateProductBrandDto } from './dto/update-product-brand.dto';
import { ProductBrandService } from './product-brand.service';

@ApiTags('Product Brand')
@Controller('product-brand')
export class ProductBrandController {
  constructor(private readonly productBrandService: ProductBrandService) { }

  @Post()
  create(@Body() createProductBrandDto: CreateProductBrandDto) {
    return this.productBrandService.create(createProductBrandDto);
  }

  @Get()
  findAll(@Query() getProductBrands: GetProductBrandsRequest) {
    return this.productBrandService.getAllAndCount(getProductBrands);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productBrandService.getOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductBrandDto: UpdateProductBrandDto) {
    return this.productBrandService.modify(id, updateProductBrandDto);
  }


  @Delete(':id')
  @UsePipes(new ValidationPipe({}))
  remove(@Param('id') id: string) {
    return this.productBrandService.deleteOne(id);
  }
}
