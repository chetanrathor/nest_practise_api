import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';
import { Product } from './../product/entities/product.entity';
import { UserEntity } from 'modules/user/entities/user.entity';
import { use } from 'passport';

@Injectable()
export class CartService {

  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>
  ) { }

  async create(createCartDto: CreateCartDto) {
    const { product, user, quantity } = createCartDto
    const cart = await this.cartRepository.findOne({ where: { product: { id: product }, user: { id: user } } })
    if (cart) {
      return false
    }
    return await this.cartRepository.save({ product: { id: product }, user: { id: user }, quantity })
  }

  async findAndCount(options?: FindManyOptions<Cart>) {
    return await this.cartRepository.findAndCount(options)
  }

  async findAll(payload: { userId: string }) {
    const { userId } = payload
    const [cartItems, count] = await this.findAndCount({ where: { user: { id: userId } }, relations: { product: true }, order: { createdAt: 'desc' } })
    let subTotalBeforDelivery = 0
    for (const item of cartItems) {
      subTotalBeforDelivery += item.quantity * item.product.mrp
    }
    return { data: cartItems, count, subTotalBeforDelivery }

  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  async update(id: string, updateCartDto: UpdateCartDto) {
    const { quantity } = updateCartDto;
    return await this.cartRepository.update({ id }, { quantity })
  }

  async remove(criteria:FindOptionsWhere<Cart>) {
    return await this.cartRepository.delete(criteria)
  }
}
