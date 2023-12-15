import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { CartModule } from 'modules/cart/cart.module';
import { OrderItemModule } from 'modules/order-item/order-item.module';
import { OrderModule } from 'modules/order/order.module';
import { TransactionModule } from 'modules/transaction/transaction.module';

@Module({
  imports:[
    TransactionModule,
    CartModule,
    OrderItemModule,
    OrderModule
  ],
  controllers: [WebhookController],
  providers: [WebhookService]
})
export class WebhookModule {}
