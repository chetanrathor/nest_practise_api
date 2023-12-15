import { Injectable } from '@nestjs/common';
import { CreateStripePaymentIntentDto } from './dto/create-stripe.payment.intent.dto';
import { UpdateStripeDto } from './dto/update-stripe.dto';
import Stripe from 'stripe';
import { AddressService } from 'modules/adress/adress.service';
import { NotFoundException } from '@nestjs/common/exceptions';
import { TransactionService } from 'modules/transaction/transaction.service';
import { randomUUID } from 'crypto';
import { Status } from 'constants';
import { TransactionStatus } from 'constants/transaction-status';

@Injectable()
export class StripeService {

  private stripe: Stripe
  constructor(
    private readonly addressService: AddressService,
    private readonly transactionService: TransactionService,
  ) {

    this.stripe = new Stripe('sk_test_51Ne2HsSJWBez7tD4XAi3e9LjqQ97jWoQGtjyV6vp9HFAesBEqNGhvD8vUtDSeVNOI7aqDjEsr9CUtyTFx8hyxtga00DPB4NeK0', {})
  }

  async getPaymentIntent(createStripePaymentIntentDto: CreateStripePaymentIntentDto) {
    const { userId, amount, description } = createStripePaymentIntentDto
    const address = await this.addressService.findOne({
      where: {
        user: { id: userId },
        isDefault: true
      }
    })

    if (!address) return new NotFoundException('No address found')


    const transactionId = randomUUID()
    const paymentData = await this.stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'inr',
      description,
      shipping: {
        name: address.recipientName,
        address: {
          line1: address.street_address,
          postal_code: address.zip,
          city: address.city,
          state: address.state,
          country: 'India',
        },
      },
      metadata: {
        transactionId,
        userId
      }
    })

    this.transactionService.create({
      id: transactionId,
      amount,
      stripeKey: paymentData.client_secret ?? '',
      user: { id: userId },
      transactionStatuc: TransactionStatus.PENDING
    })


    return {
      clientSecret: paymentData.client_secret
    }



  }

  findAll() {
    return `This action returns all stripe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stripe`;
  }

  update(id: number, updateStripeDto: UpdateStripeDto) {
    return `This action updates a #${id} stripe`;
  }

  remove(id: number) {
    return `This action removes a #${id} stripe`;
  }
}
