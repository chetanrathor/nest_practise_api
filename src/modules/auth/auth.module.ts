import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from 'modules/admin/admin.module';

import { UnverifiedUsersModule } from 'modules/unverified-users/unverified-users.module';
import { UserOtpModule } from 'modules/user-otp/user-otp.module';
import { UserEntity } from '../user/entities/user.entity';
import { NEST_SECRET } from './../../config';
import { UserModule } from './../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: NEST_SECRET,
    }),
    UnverifiedUsersModule,
    UserOtpModule,
    AdminModule
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule { }
