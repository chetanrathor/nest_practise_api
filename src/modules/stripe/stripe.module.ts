import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { AdressModule } from 'modules/adress/adress.module';
import { TransactionModule } from 'modules/transaction/transaction.module';

@Module({
  imports:[AdressModule,TransactionModule],
  controllers: [StripeController],
  providers: [StripeService]
})
export class StripeModule {}
