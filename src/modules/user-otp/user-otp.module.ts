import { Module } from '@nestjs/common';
import { UserOtpService } from './user-otp.service';
import { UserOtpController } from './user-otp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOtp } from './entities/user-otp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserOtp])],
  controllers: [UserOtpController],
  providers: [UserOtpService],
  exports: [UserOtpService]
})
export class UserOtpModule { }
