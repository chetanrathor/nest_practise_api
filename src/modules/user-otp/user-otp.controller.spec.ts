import { Test, TestingModule } from '@nestjs/testing';
import { UserOtpController } from './user-otp.controller';
import { UserOtpService } from './user-otp.service';

describe('UserOtpController', () => {
  let controller: UserOtpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserOtpController],
      providers: [UserOtpService],
    }).compile();

    controller = module.get<UserOtpController>(UserOtpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
