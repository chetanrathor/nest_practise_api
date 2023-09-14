import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, FindOptionsWhere, ILike, Repository, UpdateResult } from 'typeorm';
import { getSuccessResponse, processPagination } from 'utils';
import { CreateProductBrandDto } from './dto/create-product-brand.dto';
import { GetProductBrandsRequest } from './dto/get-product-brands';
import { UpdateProductBrandDto } from './dto/update-product-brand.dto';
import { ProductBrand } from './entities/product-brand.entity';

@Injectable()
export class ProductBrandService {
  constructor(
    @InjectRepository(ProductBrand)
    private readonly productBrandRepository: Repository<ProductBrand>,
  ) { }

  async findAndCount(options?: FindManyOptions<ProductBrand>): Promise<[ProductBrand[], number]> {
    return await this.productBrandRepository.findAndCount(options);
  }

  async findOne(options: FindOneOptions<ProductBrand>): Promise<ProductBrand | null> {
    return await this.productBrandRepository.findOne(options);
  }

  async save(data: Partial<ProductBrand> | Partial<ProductBrand>[]): Promise<ProductBrand | ProductBrand[]> {
    if (Array.isArray(data)) {
      return await this.productBrandRepository.save(data);
    } else {
      return await this.productBrandRepository.save(data, {});
    }
  }

  async update(criteria: FindOptionsWhere<ProductBrand>, data: Partial<ProductBrand>): Promise<UpdateResult> {
    return await this.productBrandRepository.update(criteria, data);
  }

  async remove(criteria: FindOptionsWhere<ProductBrand>): Promise<UpdateResult> {
    return await this.productBrandRepository.softDelete(criteria);
  }

  async create(createProductBrandDto: CreateProductBrandDto) {
    await this.save(createProductBrandDto)
    return getSuccessResponse({ message: 'Product Brand Added Successfully', response: {} })
  }

  async getAllAndCount(getProductBrands: GetProductBrandsRequest) {
    const { limit, offset, order, search } = getProductBrands
    const { skip, take } = processPagination({ limit, offset })
    const where: FindOptionsWhere<ProductBrand> = {}
    if (search) {
      where.name = ILike(`%${search}%`)
    }
    const [productBrands, totalCount] = await this.findAndCount({ skip, take, order: { createdAt: order }, where })
    const response = {
      data: productBrands,
      totalCount
    }
    return getSuccessResponse({ message: 'Product fetched successfully', response })
  }

  async getOne(id: string) {
    const productBrand = await this.findOne({ where: { id } })
    const message = 'Product Brand fetch successfully.'
    if (productBrand) {
      return getSuccessResponse({ message, response: { productBrand } })
    } else {
      return getSuccessResponse({ message, response: {} })
    }
  }

  async modify(id: string, updateProductBrandDto: UpdateProductBrandDto) {
    await this.update({ id }, updateProductBrandDto)
    return getSuccessResponse({ message: 'Product Brand Updated Successfully.', response: {} })

  }

  async deleteOne(id: string) {
    await this.remove({ id })
    const [, totalCount] = await this.findAndCount({ where: { product: { brand: { id } } }, relations: { product: true } })
    if (totalCount < 0) {

      return getSuccessResponse({ message: 'Product Brand Deleted Successfully', response: {} })
    } else {
      throw new ConflictException('Product Brand Is Associated With More Than One Product. ')
    }
  }

  async getBrand(by: FindOptionsWhere<ProductBrand>) {
    const brand = await this.findOne({ where: by })
    if (brand === null) {
      throw new NotFoundException('Brand not found.')
    }
    return brand
  }
}