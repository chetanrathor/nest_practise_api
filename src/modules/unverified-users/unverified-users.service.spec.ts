import { Test, TestingModule } from '@nestjs/testing';
import { UnverifiedUsersService } from './unverified-users.service';

describe('UnverifiedUsersService', () => {
  let service: UnverifiedUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnverifiedUsersService],
    }).compile();

    service = module.get<UnverifiedUsersService>(UnverifiedUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
