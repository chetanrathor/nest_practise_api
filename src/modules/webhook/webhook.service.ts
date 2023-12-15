import { Injectable } from '@nestjs/common';
import { TransactionStatus } from 'constants/transaction-status';
import { WebhookResponse } from 'interfaces/stripe-webhook';
import { CartService } from 'modules/cart/cart.service';
import { Cart } from 'modules/cart/entities/cart.entity';
import { OrderItem } from 'modules/order-item/entities/order-item.entity';
import { OrderItemService } from 'modules/order-item/order-item.service';
import { TransactionService } from 'modules/transaction/transaction.service';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { UpdateWebhookDto } from './dto/update-webhook.dto';
import { OrderService } from './../order/order.service';
import { PaymentType } from '../../constants';

@Injectable()
export class WebhookService {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly cartService: CartService,
    private readonly orderItemService: OrderItemService,
    private readonly orderService: OrderService,


  ) { }

  async callBack(createWebhookDto: WebhookResponse) {

    switch (createWebhookDto.type) {
      case 'payment_intent.succeeded':
        const { metadata, amount } = createWebhookDto.data.object
        const { transactionId, userId } = metadata
        this.transactionService.update({ id: metadata.transactionId }, { transactionStatuc: TransactionStatus.COMPLETED })
        const [cartItems] = await this.cartService.findAndCount({ where: { user: { id: userId } } })
        const order = await this.orderService.create({
          paymentType: PaymentType.Stripe,
          shippingCharge: 0,
          total: amount,
          user: { id: userId },
        })
        const orderItems = cartItems.reduce((acc, item) => {
          const orderItem = new OrderItem()
          orderItem.product = item.product
          orderItem.quantity = item.quantity
          orderItem.order = order

          acc.push(orderItem)
          return acc;
        }, new Array<OrderItem>())

        await this.orderItemService.bulkCreate(orderItems)
       await this.cartService.remove({ user: { id: userId } })
        break;

      case "":
        break;

      case "payment_intent.pending":
        break;

    }

    return createWebhookDto;
  }

  create(createWebhookDto: CreateWebhookDto) {
    return 'This action adds a new webhook';
  }

  findAll() {
    return `This action returns all webhook`;
  }

  findOne(id: number) {
    return `This action returns a #${id} webhook`;
  }

  update(id: number, updateWebhookDto: UpdateWebhookDto) {
    return `This action updates a #${id} webhook`;
  }

  remove(id: number) {
    return `This action removes a #${id} webhook`;
  }
}
