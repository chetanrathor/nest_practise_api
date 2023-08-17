import { Body, Controller, Post } from '@nestjs/common';
import { Param, Query } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductRatingDto } from './dto/create-product-rating.dto';
import { ProductRatingService } from './product-rating.service';

@ApiTags('product-rating')
@Controller('product-rating')
export class ProductRatingController {
  constructor(private readonly productRatingService: ProductRatingService) { }

  @Post('/product/:id')
  create(@Param('id') id: string, @Body() createProductRatingDto: CreateProductRatingDto) {
    return this.productRatingService.create(id, createProductRatingDto);
  }

  // @Get()
  // findAll() {
  //   return this.productRatingService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.productRatingService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductRatingDto: UpdateProductRatingDto) {
  //   return this.productRatingService.update(+id, updateProductRatingDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productRatingService.remove(+id);
  // }
}
