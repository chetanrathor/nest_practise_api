import { Module } from '@nestjs/common';
import { AddressService } from './adress.service';
import { AdressController } from './adress.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/adress.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  controllers: [AdressController],
  providers: [AddressService],
  exports: [AddressService]
})
export class AdressModule { }
