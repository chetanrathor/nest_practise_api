import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PetSpeciesService } from './pet-species.service';
import { CreatePetSpecyDto } from './dto/create-pet-specy.dto';
import { UpdatePetSpecyDto } from './dto/update-pet-specy.dto';
import { GetPetSpeciesRequest } from './dto/get-pet-species.dto';
import { ApiTags } from '@nestjs/swagger';
import { Query } from '@nestjs/common/decorators';

@ApiTags('pet-species')
@Controller('pet-species')
export class PetSpeciesController {
  constructor(private readonly petSpeciesService: PetSpeciesService) { }

  @Post()
  create(@Body() createPetSpecyDto: CreatePetSpecyDto) {
    return this.petSpeciesService.create(createPetSpecyDto);
  }

  @Get()
  findAll(@Query() getPetSpecies: GetPetSpeciesRequest) {
    return this.petSpeciesService.getAllAndCount(getPetSpecies);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.petSpeciesService.getOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePetSpecyDto: UpdatePetSpecyDto) {
    return this.petSpeciesService.modify(id, updatePetSpecyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petSpeciesService.deleteOne(id);
  }
}
