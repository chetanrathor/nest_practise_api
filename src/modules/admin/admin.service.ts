import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, FindOptionsWhere, Repository, UpdateResult } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) { }


  async findOne(options: FindOneOptions<Admin>): Promise<Admin | null> {
    return await this.adminRepository.findOne(options);
  }



  async update(criteria: FindOptionsWhere<Admin>, data: Partial<Admin>): Promise<UpdateResult> {
    return await this.adminRepository.update(criteria, data);
  }


}