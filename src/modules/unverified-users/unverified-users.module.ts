import { Module } from '@nestjs/common';
import { UnverifiedUsersService } from './unverified-users.service';
import { UnverifiedUsersController } from './unverified-users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnverifiedUser } from './entities/unverified-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UnverifiedUser])],
  controllers: [UnverifiedUsersController],
  providers: [UnverifiedUsersService],
  exports: [UnverifiedUsersService]
})
export class UnverifiedUsersModule { }
