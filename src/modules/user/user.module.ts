import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { add } from 'lodash';
import { AdressModule } from 'modules/adress/adress.module';
import { ConsultationModule } from 'modules/consultation/consultation.module';
import { OrderModule } from 'modules/order/order.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    AdressModule,
    ConsultationModule,
    OrderModule

],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule { }
