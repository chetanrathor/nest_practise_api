import { Module } from '@nestjs/common';
import { ProductRatingService } from './product-rating.service';
import { ProductRatingController } from './product-rating.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRating } from './entities/product-rating.entity';
import { ProductModule } from 'modules/product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRating]), ProductModule],
  controllers: [ProductRatingController],
  providers: [ProductRatingService],
  exports: [ProductRatingService]
})
export class ProductRatingModule { }
