import { Module } from '@nestjs/common';
import { PetSpeciesService } from './pet-species.service';
import { PetSpeciesController } from './pet-species.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetSpecy } from './entities/pet-specy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PetSpecy])],
  controllers: [PetSpeciesController],
  providers: [PetSpeciesService],
  exports: [PetSpeciesService]
})
export class PetSpeciesModule { }
