import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryInterface } from 'interfaces/repository.interface';
import { Address } from 'modules/adress/entities/adress.entity';
import { FindManyOptions, FindOneOptions, FindOptionsWhere, Repository, UpdateResult } from 'typeorm';
import { UnverifiedUser } from './entities/unverified-user.entity';

@Injectable()
export class UnverifiedUsersService implements RepositoryInterface<UnverifiedUser> {
  constructor(
    @InjectRepository(UnverifiedUser)
    private readonly unverifiedUserRepository: Repository<UnverifiedUser>
  ) { }

  async findAndCount(options: FindManyOptions<UnverifiedUser>): Promise<[UnverifiedUser[], number]> {
    return await this.unverifiedUserRepository.findAndCount(options);
  }

  async findOne(options: FindOneOptions<UnverifiedUser>): Promise<UnverifiedUser | null> {
    return await this.unverifiedUserRepository.findOne(options);
  }

  async save(data: Partial<UnverifiedUser> | Partial<UnverifiedUser>[]): Promise<UnverifiedUser | UnverifiedUser[]> {
    if (Array.isArray(data)) {
      return await this.unverifiedUserRepository.save(data);
    } else {
      return await this.unverifiedUserRepository.save(data, {});
    }
  }

  async update(criteria: FindOptionsWhere<UnverifiedUser>, data: Partial<UnverifiedUser>): Promise<UpdateResult> {
    return await this.unverifiedUserRepository.update(criteria, data);
  }

  async remove(criteria: FindOptionsWhere<UnverifiedUser>): Promise<UpdateResult> {
    return await this.unverifiedUserRepository.softDelete(criteria);
  }
}