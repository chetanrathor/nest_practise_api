import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductBrandModule } from 'modules/product-brand/product-brand.module';
import { ProductCategoryModule } from 'modules/product-category/product-category.module';
import { PetSpeciesModule } from 'modules/pet-species/pet-species.module';
import { ProductImageModule } from 'modules/product-image/product-image.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), ProductBrandModule, ProductCategoryModule, PetSpeciesModule, ProductImageModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductModule { }
