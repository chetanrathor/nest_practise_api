import { Test, TestingModule } from '@nestjs/testing';
import { UnverifiedUsersController } from './unverified-users.controller';
import { UnverifiedUsersService } from './unverified-users.service';

describe('UnverifiedUsersController', () => {
  let controller: UnverifiedUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnverifiedUsersController],
      providers: [UnverifiedUsersService],
    }).compile();

    controller = module.get<UnverifiedUsersController>(UnverifiedUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
