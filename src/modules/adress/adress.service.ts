import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryInterface } from 'interfaces/repository.interface';
import { DeepPartial, FindManyOptions, FindOneOptions, FindOptionsWhere, Repository, UpdateResult } from 'typeorm';
import { Address } from './entities/adress.entity';

@Injectable()
export class AddressService implements RepositoryInterface<Address> {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>
  ) { }

  async findAndCount(options: FindManyOptions<Address>): Promise<[Address[], number]> {
    return await this.addressRepository.findAndCount(options);
  }

  async findOne(options: FindOneOptions<Address>): Promise<Address | null> {
    return await this.addressRepository.findOne(options);
  }

  async save(data: DeepPartial<Address> | DeepPartial<Address>[]): Promise<Address | Address[]> {
    if (Array.isArray(data)) {
      return await this.addressRepository.save(data);
    } else {
      return await this.addressRepository.save(data, {});
    }
  }

  async update(criteria: FindOptionsWhere<Address>, data: Partial<Address>): Promise<UpdateResult> {
    return await this.addressRepository.update(criteria, data);
  }



  async remove(id: number): Promise<void> {
    await this.addressRepository.delete(id);
  }
}



