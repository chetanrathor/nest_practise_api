import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ApiConfigService } from './shared/api-config.service';
import { SharedModule } from './shared/shared.module';
import { ProductModule } from './modules/product/product.module';
import { ProductRatingModule } from './modules/product-rating/product-rating.module';
import { ProductBrandModule } from './modules/product-brand/product-brand.module';
import { ProductCategoryModule } from './modules/product-category/product-category.module';
import { PetSpeciesModule } from './modules/pet-species/pet-species.module';
import { ProductImageModule } from './modules/product-image/product-image.module';
import { BlogModule } from './modules/blog/blog.module';
import { AdressModule } from './modules/adress/adress.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { OrderModule } from './modules/order/order.module';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { ConsultationModule } from './modules/consultation/consultation.module';
import { UserOtpModule } from './modules/user-otp/user-otp.module';
import { UnverifiedUsersModule } from './modules/unverified-users/unverified-users.module';
import { EmailModule } from './modules/email/email.module';
import { AdminModule } from './modules/admin/admin.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { CartModule } from './modules/cart/cart.module';
import { StripeModule } from './modules/stripe/stripe.module';
import { WebhookModule } from './modules/webhook/webhook.module';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'dev.chetan.rathor@gmail.com',
          pass: 'lxlu maum jhdm nbud'
        },
        tls: {
          rejectUnauthorized: false
        },
      }
    })
    , ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) =>
        configService.postgresConfig,
      inject: [ApiConfigService],
    }),
    UserModule,
    AuthModule,
    WinstonModule.forRoot({
      transports: [new winston.transports.Console()],
      // options
    }),
    ProductModule,
    ProductRatingModule,
    ProductBrandModule,
    ProductCategoryModule,
    PetSpeciesModule,
    ProductImageModule,
    BlogModule,
    AdressModule,
    TransactionModule,
    OrderModule,
    AppointmentModule,
    ConsultationModule,
    UserOtpModule,
    UnverifiedUsersModule,
    EmailModule,
    AdminModule,
    CartModule,
    StripeModule,
    WebhookModule,
  ],
  providers: [],
  exports: [TypeOrmModule],
  controllers: [AppController],
})
export class AppModule { }
