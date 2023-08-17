import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { GetProductCategoriesRequest } from './dto/get-product-categories.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { ProductCategoryService } from './product-category.service';

@ApiTags('product-category')
@Controller('product-category')
export class ProductCategoryController {
  constructor(private readonly productCategoryService: ProductCategoryService) { }

  @Post()
  create(@Body() createProductCategoryDto: CreateProductCategoryDto) {
    return this.productCategoryService.create(createProductCategoryDto);
  }

  @Get()
  findAll(@Query() getProductCategories: GetProductCategoriesRequest) {
    return this.productCategoryService.getAllAndCount(getProductCategories);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productCategoryService.getOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductCategoryDto: UpdateProductCategoryDto) {
    return this.productCategoryService.modify(id, updateProductCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productCategoryService.deleteOne(id);
  }
}
