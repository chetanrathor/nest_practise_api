import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { getSuccessResponse } from 'utils';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    try {
      const response = this.cartService.create(createCartDto);
      return getSuccessResponse({ message: 'Item Added Successfully', response })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  @Get('/user/:userId')
  async findAll(@Param('userId') userId: string) {
    const response = await this.cartService.findAll({ userId });
    return getSuccessResponse({ message: 'Cart List', response })
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    try {
      await this.cartService.update(id, updateCartDto);
      return getSuccessResponse({ message: 'Updated successfully', response: {}})

    } catch (error:any) {
      throw new Error(error)
    }
  }

  @Delete(':productId')
  async remove(@Param('productId') id: string) {
    try {

      await this.cartService.remove(id);
      return getSuccessResponse({ message: 'Deleted Successfully', response: {} })
    } catch (error) {

    }

  }
}
