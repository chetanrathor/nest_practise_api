import { Test, TestingModule } from '@nestjs/testing';
import { PetSpeciesService } from './pet-species.service';

describe('PetSpeciesService', () => {
  let service: PetSpeciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetSpeciesService],
    }).compile();

    service = module.get<PetSpeciesService>(PetSpeciesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
