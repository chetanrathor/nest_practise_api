import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'cluster';
import { FindManyOptions, FindOneOptions, FindOptionsOrder, FindOptionsWhere, ILike, Repository, UpdateResult } from 'typeorm';

import type { UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { GetUsersDTO } from './dto/get-users.dto';
import { getSuccessResponse, processPagination } from 'utils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  async createUser(userInfo: Partial<UserEntity>) {
    const result = this.userRepository.create(
      Object.assign(new UserEntity(), userInfo),
    );
    await this.userRepository.save(result);

    return result;
  }



  async findUser(by: {
    mobileNumber?: string;
    email?: string;
    mobileOtp?: string;
    emailOtp?: string;
    id?: string;
  }) {
    return this.userRepository.findOne({ where: by });
  }

  updateUser(userId: string, user: UserDto) {
    return this.userRepository.update({ id: userId }, user);
  }

  async findAndCount(options?: FindManyOptions<UserEntity>): Promise<[UserEntity[], number]> {
    return await this.userRepository.findAndCount(options);
  }

  async findOne(options: FindOneOptions<UserEntity>): Promise<UserEntity | null> {
    return await this.userRepository.findOne(options);
  }

  async save(data: Partial<UserEntity> | Partial<UserEntity>[]): Promise<UserEntity | UserEntity[]> {
    if (Array.isArray(data)) {
      return await this.userRepository.save(data);
    } else {
      return await this.userRepository.save(data, {});
    }
  }

  async update(criteria: FindOptionsWhere<UserEntity>, data: Partial<UserEntity>): Promise<UpdateResult> {
    return await this.userRepository.update(criteria, data);
  }

  async remove(criteria: FindOptionsWhere<UserEntity>): Promise<UpdateResult> {
    return await this.userRepository.softDelete(criteria);
  }

  async getUsers(getusersDto: GetUsersDTO) {
    const { limit, offset, order, search, status, role } = getusersDto
    const where: FindOptionsWhere<UserEntity> = {
      status,
    }
    const orders: FindOptionsOrder<UserEntity> = {
      createdAt: order
    }
    if (search) {
      where.fullName = ILike(`%${search}`)
    }
    if (role) {
      where.role = role
    }
    const { skip, take } = processPagination({ limit, offset })
    const [data, totalCount] = await this.findAndCount({ where, order: orders, skip, take })
    return getSuccessResponse({ response: { data, totalCount }, message: 'users fetch successfully.' })
  }


}
