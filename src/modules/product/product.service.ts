import { BadRequestException, Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { BreedType, InStock, Status } from '../../constants';
import { Offers } from 'constants/offers';
import { CartService } from 'modules/cart/cart.service';
import { Cart } from 'modules/cart/entities/cart.entity';
import { PetSpecy } from 'modules/pet-species/entities/pet-specy.entity';
import { PetSpeciesService } from 'modules/pet-species/pet-species.service';
import { ProductBrand } from 'modules/product-brand/entities/product-brand.entity';
import { ProductBrandService } from 'modules/product-brand/product-brand.service';
import { ProductCategory } from 'modules/product-category/entities/product-category.entity';
import { ProductCategoryService } from 'modules/product-category/product-category.service';
import { ProductImage } from 'modules/product-image/entities/product-image.entity';
import { ProductImageService } from 'modules/product-image/product-image.service';
import { ProductRating } from 'modules/product-rating/entities/product-rating.entity';
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
    private readonly productImageService: ProductImageService,
    private readonly cartService: CartService,


  ) { }

  async findAndCount(options?: FindManyOptions<Product>): Promise<[Product[], number]> {
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
    const { limit, offset, order, userId } = getProducts;
    const { skip, take } = processPagination({ limit, offset });
    console.log('skip,take', skip, take)
    const where = this.processFilterForGetAllProducts(getProducts)
    const relations: FindOptionsRelations<Product> = {
      brand: true,
      category: true,
      specy: true,
      productImage: true,
      productRating: true,

    }
    let cartProductIds: string[] = []
    if (userId) {
      const [cartProducts] = await this.cartService.findAndCount({ select: { id: true, product: { id: true } }, where: { user: { id: userId } }, relations: { product: true } })
      if (cartProducts.length) {
        cartProductIds = cartProducts.map((item) => item.product.id)
      }
    }


    const [products, totalCount] = await this.findAndCount({ skip, take, order: { createdAt: order }, where, relations });
    let productsMapped: { isAvailableInCart: boolean; name: string; discount: number; mrp: number; sellingPrice: number; breedType: BreedType; description: string; isOnSale: boolean; inStock: InStock; productRating: ProductRating; productImage: ProductImage[]; brand: ProductBrand; category: ProductCategory; specy: PetSpecy; cart: Cart[]; id: string; createdAt: Date; updatedAt: Date; deletedAt: Date; status: Status; }[] = []


    productsMapped = products.map((item) => {
      return {
        ...item,
        isAvailableInCart: cartProductIds.includes(item.id)
      }
    })

    const response = {
      data: productsMapped,
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

  mapProductLength(data: any[]) {
    return data.map((item: any) => {
      return {
        ...item,
        product: item.product.length
      };
    });
  }

  async getFiltersData() {
    const select = { id: true, name: true, product: { id: true } }
    let [[petSpecies], [brands], [categories], products] = await Promise.all([
      this.petSpeciesService.findAndCount({ select, relations: { product: true } }),
      this.productBrandService.findAndCount({ select, relations: { product: true } }),
      this.productCategoryService.findAndCount({ select, relations: { product: true } }),
      this.productRepository.createQueryBuilder('product').select('product.breed_type,COUNT(product.id)').groupBy('product.breed_type').getRawMany()
    ])

    products = products.map((item) => {
      return {
        id: item.breed_type,
        name: item.breed_type,
        product: parseInt(item.count) ?? 0

      }
    })





    return {
      petSpecies: this.mapProductLength(petSpecies),
      brands: this.mapProductLength(brands),
      categories: this.mapProductLength(categories),
      breedTypes: products,
    }
  }



}

