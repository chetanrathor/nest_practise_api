import { Test, TestingModule } from '@nestjs/testing';
import { PetSpeciesController } from './pet-species.controller';
import { PetSpeciesService } from './pet-species.service';

describe('PetSpeciesController', () => {
  let controller: PetSpeciesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PetSpeciesController],
      providers: [PetSpeciesService],
    }).compile();

    controller = module.get<PetSpeciesController>(PetSpeciesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
