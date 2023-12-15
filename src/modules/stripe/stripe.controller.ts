import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StripeService } from './stripe.service';
import {  CreateStripePaymentIntentDto } from './dto/create-stripe.payment.intent.dto';
import { UpdateStripeDto } from './dto/update-stripe.dto';
import { ApiTags } from '@nestjs/swagger';
import { getSuccessResponse } from 'utils';

@ApiTags('stripe')
@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) { }

  @Post('payment-intent')
  async create(@Body() createStripePaymentIntentDto: CreateStripePaymentIntentDto) {
    try {
      const response = await this.stripeService.getPaymentIntent(createStripePaymentIntentDto);
      return getSuccessResponse({
        message: 'Payment intent was successfully generated',
        response
      })

    } catch (error: any) {
      throw new Error(error);
    }
  }

  @Get()
  findAll() {
    return this.stripeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stripeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStripeDto: UpdateStripeDto) {
    return this.stripeService.update(+id, updateStripeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stripeService.remove(+id);
  }
}
