import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, FindOptionsWhere, Repository, UpdateResult } from 'typeorm';
import { ProductImage } from './entities/product-image.entity';

@Injectable()
export class ProductImageService {
  constructor(
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
  ) { }

  async findAndCount(options: FindManyOptions<ProductImage>): Promise<[ProductImage[], number]> {
    return await this.productImageRepository.findAndCount(options);
  }

  async findOne(options: FindOneOptions<ProductImage>): Promise<ProductImage | null> {
    return await this.productImageRepository.findOne(options);
  }

  async save(data: Partial<ProductImage> | Partial<ProductImage>[]): Promise<ProductImage | ProductImage[]> {
    if (Array.isArray(data)) {
      return await this.productImageRepository.save(data);
    } else {
      return await this.productImageRepository.save(data, {});
    }
  }

  async update(criteria: FindOptionsWhere<ProductImage>, data: Partial<ProductImage>): Promise<UpdateResult> {
    return await this.productImageRepository.update(criteria, data);
  }

  async remove(criteria: FindOptionsWhere<ProductImage>): Promise<UpdateResult> {
    return await this.productImageRepository.softDelete(criteria);
  }
}