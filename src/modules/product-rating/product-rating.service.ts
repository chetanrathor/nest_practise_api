import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryInterface } from 'interfaces/repository.interface';
import { ProductService } from 'modules/product/product.service';
import { DeepPartial, FindManyOptions, FindOneOptions, FindOptionsWhere, Repository, UpdateResult } from 'typeorm';
import { getSuccessResponse } from 'utils';
import { CreateProductRatingDto } from './dto/create-product-rating.dto';
import { ProductRating } from './entities/product-rating.entity';

@Injectable()
export class ProductRatingService implements RepositoryInterface<ProductRating> {
  constructor(
    @InjectRepository(ProductRating)
    private productRatingRepository: Repository<ProductRating>,
    private productService: ProductService
  ) { }

  async findAndCount(options: FindManyOptions<ProductRating>): Promise<[ProductRating[], number]> {
    return await this.productRatingRepository.findAndCount(options);
  }

  async findOne(options: FindOneOptions<ProductRating>): Promise<ProductRating | null> {
    return await this.productRatingRepository.findOne(options);
  }
  async save(data: DeepPartial<ProductRating> | DeepPartial<ProductRating>[]): Promise<ProductRating | ProductRating[]> {
    if (Array.isArray(data)) {
      return await this.productRatingRepository.save(data);
    } else {
      return await this.productRatingRepository.save(data, {});
    }
  }

  async update(criteria: FindOptionsWhere<ProductRating>, data: Partial<ProductRating>): Promise<UpdateResult> {
    return await this.productRatingRepository.update(criteria, data);

  }

  async create(id: string, createProductRatingDto: CreateProductRatingDto) {
    const product = await this.productService.getProduct({ id })
    const rating = await this.findOne({ where: { product: { id: product.id } } })
    console.log('rating', rating)
    if (rating) {
      const overall = Number(rating.overall) + createProductRatingDto.rating
      const reviews = Number(rating.reviews) + 1
      const average = overall / reviews
      await this.update({ id: rating.id }, { overall, average, reviews, })
    } else {
      await this.save({ average: createProductRatingDto.rating, overall: createProductRatingDto.rating, reviews: 1, product })
    }

    return getSuccessResponse({ message: 'Review created successfully.', response: {} })

  }


}

