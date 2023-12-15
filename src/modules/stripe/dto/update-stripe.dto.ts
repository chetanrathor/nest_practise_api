import { PartialType } from '@nestjs/swagger';
import { CreateStripePaymentIntentDto } from './create-stripe.payment.intent.dto';

export class UpdateStripeDto extends PartialType(CreateStripePaymentIntentDto) {}
