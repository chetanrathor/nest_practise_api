import { BadRequestException, Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { PetSpeciesService } from 'modules/pet-species/pet-species.service';
import { ProductBrandService } from 'modules/product-brand/product-brand.service';
import { ProductCategoryService } from 'modules/product-category/product-category.service';
import { ProductImageService } from 'modules/product-image/product-image.service';
import { Between, FindManyOptions, FindOneOptions, FindOptionsRelations, FindOptionsWhere, ILike, LessThan, MoreThan, Repository, UpdateResult } from 'typeorm';
import { getSuccessResponse, isValidNumber, processPagination } from 'utils';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsRequest } from './dto/get-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly productBrandService: ProductBrandService,
    private readonly productCategoryService: ProductCategoryService,
    private readonly petSpeciesService: PetSpeciesService,
    private readonly productImageService: ProductImageService
  ) { }

  async findAndCount(options: FindManyOptions<Product>): Promise<[Product[], number]> {
    return await this.productRepository.findAndCount(options);
  }

  async findOne(options: FindOneOptions<Product>): Promise<Product | null> {
    return await this.productRepository.findOne(options);
  }

  async save(data: Partial<Product> | Partial<Product>[]): Promise<Product | Product[]> {
    if (Array.isArray(data)) {
      return await this.productRepository.save(data);
    } else {
      return await this.productRepository.save(data, {});
    }
  }

  async update(criteria: FindOptionsWhere<Product>, data: Partial<Product>): Promise<UpdateResult> {
    return await this.productRepository.update(criteria, data);
  }

  async remove(criteria: FindOptionsWhere<Product>): Promise<UpdateResult> {
    return await this.productRepository.softDelete(criteria);
  }

  async create(createProductDto: CreateProductDto) {
    const { productImages, ...rest } = createProductDto

    const brand = await this.productBrandService.getBrand({ id: createProductDto.brand })
    const category = await this.productCategoryService.getCategory({ id: createProductDto.category })
    const specy = await this.petSpeciesService.getSpecy({ id: createProductDto.specy })
    const product = await this.save({ ...rest, brand, category, specy }) as Product

    const productImagesProcessed = productImages.map((item) => {
      const child = {
        link: item.link,
        product
      }
      return child
    })

    this.productImageService.save(productImagesProcessed)


    return getSuccessResponse({ message: 'Product Added Successfully', response: {} });
  }

  async getAllAndCount(getProducts: GetProductsRequest) {
    const { limit, offset, order, } = getProducts;
    const { skip, take } = processPagination({ limit, offset });
    const where = this.processFilterForGetAllProducts(getProducts)
    const relations: FindOptionsRelations<Product> = {
      brand: true,
      category: true,
      specy: true,
      productImage: true,
      productRating: true,

    }
    const [products, totalCount] = await this.findAndCount({ skip, take, order: { createdAt: order }, where, relations });
    const response = {
      data: products,
      totalCount,
    };
    return getSuccessResponse({ message: 'Products fetched successfully', response });
  }

  async getOne(id: string) {
    const product = await this.findOne({ where: { id } });
    const message = 'Product fetched successfully.';
    if (product) {
      return getSuccessResponse({ message, response: { product } });
    } else {
      return getSuccessResponse({ message, response: {} });
    }
  }

  async modify(id: string, updateProductDto: UpdateProductDto) {
    const { productImages, ...rest } = updateProductDto
    const product = await this.getProduct({ id })
    const brand = await this.productBrandService.getBrand({ id: updateProductDto.brand })
    const category = await this.productCategoryService.getCategory({ id: updateProductDto.category })
    const specy = await this.petSpeciesService.getSpecy({ id: updateProductDto.specy })
    await this.update({ id }, { ...rest, brand, category, specy })

    const productImagesProcessed = productImages?.map((item) => {
      const child = {
        link: item.link,
        product
      }
      return child
    })

    if (productImagesProcessed) {

      this.productImageService.save(productImagesProcessed)
    }


    return getSuccessResponse({ message: 'Product Updated Successfully', response: {} });
  }

  async deleteOne(id: string) {
    await this.remove({ id });
    // Add your logic here for handling the response accordingly.
  }

  processNumericValues(getProducts: GetProductsRequest) {
    const response: { discount?: number, startPrice?: number, endPrice?: number } = {}
    if (getProducts.discount && isValidNumber(getProducts.discount) === false) {
      throw new BadRequestException('Discount is not valid number.')
    }
    response.discount = Number(getProducts.discount)
    if (getProducts.startPrice && isValidNumber(getProducts.startPrice) === false) {
      throw new BadRequestException('Start price is not valid number.')
    }
    response.startPrice = Number(getProducts.startPrice)
    if (getProducts.endPrice && isValidNumber(getProducts.endPrice) === false) {
      throw new BadRequestException('End price is not valid number.')
    }
    response.endPrice = Number(getProducts.endPrice)

    return response


  }

  processFilterForGetAllProducts(getProducts: GetProductsRequest) {
    const { brand, breedType, category, specy, search } = getProducts
    const { discount, endPrice, startPrice } = this.processNumericValues(getProducts)

    const where: FindOptionsWhere<Product> = {};
    if (search) {
      where.name = ILike(`%${search}%`);
    }
    if (discount) {
      where.discount = LessThan(discount)
    }

    if (startPrice && endPrice) {
      where.sellingPrice = Between(startPrice, endPrice)
    }

    if (startPrice) {
      where.sellingPrice = MoreThan(startPrice)
    }

    if (endPrice) {
      where.sellingPrice = LessThan(endPrice)
    }

    if (category) {
      where.category = { id: category }
    }
    if (brand) {
      where.brand = { id: brand }
    }
    if (breedType) {
      where.breedType = breedType
    }
    if (specy) {
      where.specy = { id: specy }
    }

    return where
  }

  async getProduct(by: FindOptionsWhere<Product>) {
    const product = await this.findOne({ where: by })
    if (product === null) {
      throw new NotFoundException('product not found')
    }

    return product
  }



}

