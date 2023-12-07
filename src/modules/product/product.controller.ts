import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetProductsRequest } from './dto/get-products.dto';
import { Query } from '@nestjs/common/decorators';
import { getSuccessResponse } from 'utils';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  async findAll(@Query() getProducts: GetProductsRequest) {
    return await this.productService.getAllAndCount(getProducts);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.getOne(id);
  }

  @Get('filters')
  async getFiltersData() {
    try {
      const response = await this.productService.getFiltersData();
      return getSuccessResponse({ message: 'Filters Data', response })
    } catch (error:any) {
      throw new Error(error)
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.modify(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.deleteOne(id);
  }
}
