import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, FindOptionsWhere, ILike, Repository, UpdateResult } from 'typeorm';
import { getSuccessResponse, processPagination } from 'utils';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { GetProductCategoriesRequest } from './dto/get-product-categories.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { ProductCategory } from './entities/product-category.entity';
@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
  ) { }

  async findAndCount(options: FindManyOptions<ProductCategory>): Promise<[ProductCategory[], number]> {
    return await this.productCategoryRepository.findAndCount(options);
  }

  async findOne(options: FindOneOptions<ProductCategory>): Promise<ProductCategory | null> {
    return await this.productCategoryRepository.findOne(options);
  }

  async save(data: Partial<ProductCategory> | Partial<ProductCategory>[]): Promise<ProductCategory | ProductCategory[]> {
    if (Array.isArray(data)) {
      return await this.productCategoryRepository.save(data);
    } else {
      return await this.productCategoryRepository.save(data, {});
    }
  }

  async update(criteria: FindOptionsWhere<ProductCategory>, data: Partial<ProductCategory>): Promise<UpdateResult> {
    return await this.productCategoryRepository.update(criteria, data);
  }

  async remove(criteria: FindOptionsWhere<ProductCategory>): Promise<UpdateResult> {
    return await this.productCategoryRepository.softDelete(criteria);
  }

  async create(createProductCategoryDto: CreateProductCategoryDto) {
    await this.save(createProductCategoryDto);
    return getSuccessResponse({ message: 'Product Category Added Successfully', response: {} });
  }

  async getAllAndCount(getProductCategories: GetProductCategoriesRequest) {
    const { limit, offset, order, search } = getProductCategories;
    const { skip, take } = processPagination({ limit, offset });
    const where: FindOptionsWhere<ProductCategory> = {};
    if (search) {
      where.name = ILike(`%${search}%`);
    }
    const [productCategories, totalCount] = await this.findAndCount({ skip, take, order: { createdAt: order }, where });
    const response = {
      data: productCategories,
      totalCount,
    };
    return getSuccessResponse({ message: 'Product Categories fetched successfully', response });
  }

  async getOne(id: string) {
    const productCategory = await this.findOne({ where: { id } });
    const message = 'Product Category fetched successfully.';
    if (productCategory) {
      return getSuccessResponse({ message, response: { productCategory } });
    } else {
      return getSuccessResponse({ message, response: {} });
    }
  }

  async modify(id: string, updateProductCategoryDto: UpdateProductCategoryDto) {
    await this.update({ id }, updateProductCategoryDto);
    return getSuccessResponse({ message: 'Product Category Updated Successfully.', response: {} });
  }

  async deleteOne(id: string) {
    const [, totalCount] = await this.findAndCount({ where: { product: { category: { id } } }, relations: { product: true } });
    if (totalCount === 0) {
      await this.remove({ id });
      return getSuccessResponse({ message: 'Product Category Deleted Successfully', response: {} });
    } else {
      throw new ConflictException('Product Category Is Associated With Products.');
    }
  }


  async getCategory(by: FindOptionsWhere<ProductCategory>) {
    const brand = await this.findOne({ where: by })
    if (brand === null) {
      throw new NotFoundException('Brand not found.')
    }
    return brand
  }
}
