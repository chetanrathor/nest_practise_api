import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from '../../constants';
import { FindManyOptions, FindOneOptions, FindOptionsWhere, LessThan, Repository, UpdateResult } from 'typeorm';
import { UserOtp } from './entities/user-otp.entity';
import dayjs from 'dayjs';

@Injectable()
export class UserOtpService {
  constructor(@InjectRepository(UserOtp)
  private readonly userOtpRepository: Repository<UserOtp>) { }

  async findAndCount(options: FindManyOptions<UserOtp>): Promise<[UserOtp[], number]> {
    return await this.userOtpRepository.findAndCount(options);
  }

  async findOne(options: FindOneOptions<UserOtp>): Promise<UserOtp | null> {
    return await this.userOtpRepository.findOne(options);
  }

  async save(data: Partial<UserOtp> | Partial<UserOtp>[]): Promise<UserOtp | UserOtp[]> {
    if (Array.isArray(data)) {
      return await this.userOtpRepository.save(data);
    } else {
      return await this.userOtpRepository.save(data, {});
    }
  }

  async update(criteria: FindOptionsWhere<UserOtp>, data: Partial<UserOtp>): Promise<UpdateResult> {
    return await this.userOtpRepository.update(criteria, data);
  }

  async remove(criteria: FindOptionsWhere<UserOtp>): Promise<UpdateResult> {
    return await this.userOtpRepository.softDelete(criteria);
  }

  async isOtpValid(email: string) {
    const currentTime = dayjs().unix()
    const userOtp = await this.findOne({ where: { user: { email }, status: Status.ACTIVE } })
    if (userOtp) {
      const otpCreatedAt = dayjs(userOtp.createdAt).unix()
      const difference = (currentTime - otpCreatedAt)
      if (difference <= 300) {
        return true
      } else {
        return false
      }


    } else {
      return false
    }
  }
}
