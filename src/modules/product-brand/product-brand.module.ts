import { Module } from '@nestjs/common';
import { ProductBrandService } from './product-brand.service';
import { ProductBrandController } from './product-brand.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductBrand } from './entities/product-brand.entity';
import { ProductService } from 'modules/product/product.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([ProductBrand]), JwtModule,],
  controllers: [ProductBrandController],
  providers: [ProductBrandService],
  exports: [ProductBrandService]
})
export class ProductBrandModule { }
