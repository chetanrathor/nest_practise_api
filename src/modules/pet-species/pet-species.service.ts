import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, FindOptionsWhere, ILike, Repository, UpdateResult } from 'typeorm';
import { getSuccessResponse, processPagination } from 'utils';
import { CreatePetSpecyDto } from './dto/create-pet-specy.dto';
import { GetPetSpeciesRequest } from './dto/get-pet-species.dto';
import { UpdatePetSpecyDto } from './dto/update-pet-specy.dto';
import { PetSpecy } from './entities/pet-specy.entity';
@Injectable()
export class PetSpeciesService {
  constructor(
    @InjectRepository(PetSpecy)
    private readonly petSpeciesRepository: Repository<PetSpecy>,
  ) { }

  async findAndCount(options: FindManyOptions<PetSpecy>): Promise<[PetSpecy[], number]> {
    return await this.petSpeciesRepository.findAndCount(options);
  }

  async findOne(options: FindOneOptions<PetSpecy>): Promise<PetSpecy | null> {
    return await this.petSpeciesRepository.findOne(options);
  }

  async save(data: Partial<PetSpecy> | Partial<PetSpecy>[]): Promise<PetSpecy | PetSpecy[]> {
    if (Array.isArray(data)) {
      return await this.petSpeciesRepository.save(data);
    } else {
      return await this.petSpeciesRepository.save(data, {});
    }
  }

  async update(criteria: FindOptionsWhere<PetSpecy>, data: Partial<PetSpecy>): Promise<UpdateResult> {
    return await this.petSpeciesRepository.update(criteria, data);
  }

  async remove(criteria: FindOptionsWhere<PetSpecy>): Promise<UpdateResult> {
    return await this.petSpeciesRepository.softDelete(criteria);
  }

  async create(createPetSpeciesDto: CreatePetSpecyDto) {
    await this.save(createPetSpeciesDto);
    return getSuccessResponse({ message: 'Pet Species Added Successfully', response: {} });
  }

  async getAllAndCount(getPetSpecies: GetPetSpeciesRequest) {
    const { limit, offset, order, search } = getPetSpecies;
    const { skip, take } = processPagination({ limit, offset });
    const where: FindOptionsWhere<PetSpecy> = {};
    if (search) {
      where.name = ILike(`%${search}%`);
    }
    const [petSpeciesList, totalCount] = await this.findAndCount({ skip, take, order: { createdAt: order }, where });
    const response = {
      data: petSpeciesList,
      totalCount,
    };
    return getSuccessResponse({ message: 'Pet Species fetched successfully', response });
  }

  async getOne(id: string) {
    const petSpecies = await this.findOne({ where: { id } });
    const message = 'Pet Species fetched successfully.';
    if (petSpecies) {
      return getSuccessResponse({ message, response: { petSpecies } });
    } else {
      return getSuccessResponse({ message, response: {} });
    }
  }

  async modify(id: string, updatePetSpeciesDto: UpdatePetSpecyDto) {
    await this.update({ id }, updatePetSpeciesDto);
    return getSuccessResponse({ message: 'Pet Species Updated Successfully.', response: {} });
  }

  async deleteOne(id: string) {
    const [, totalCount] = await this.findAndCount({ where: { product: { specy: { id } } }, relations: { product: true } });
    if (totalCount == 0) {
      await this.remove({ id });
      return getSuccessResponse({ message: 'Pet Species Deleted Successfully', response: {} });
    } else {
      throw new ConflictException('Pet Species Is Associated With Pets.');
    }
  }

  async getSpecy(by: FindOptionsWhere<PetSpecy>) {
    const brand = await this.findOne({ where: by })
    if (brand === null) {
      throw new NotFoundException('Brand not found.')
    }
    return brand
  }
}

