import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { ProductModule } from 'modules/product/product.module';
import { ProductBrandModule } from 'modules/product-brand/product-brand.module';
import { OrderModule } from 'modules/order/order.module';
import { AppointmentModule } from 'modules/appointment/appointment.module';
import { UserModule } from 'modules/user/user.module';
import { ConsultationModule } from 'modules/consultation/consultation.module';
import { TransactionModule } from 'modules/transaction/transaction.module';
import { BlogModule } from 'modules/blog/blog.module';

const restModules = [
  ProductModule,
  ProductBrandModule,
  OrderModule,
  AppointmentModule,
  UserModule,
  ConsultationModule,
  TransactionModule,
  BlogModule

]

@Module({
  imports: [TypeOrmModule.forFeature([Admin]), ...restModules],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService]
})
export class AdminModule { }
