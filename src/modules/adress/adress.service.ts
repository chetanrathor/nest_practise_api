import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryInterface } from 'interfaces/repository.interface';
import { DeepPartial, FindManyOptions, FindOneOptions, FindOptionsWhere, Repository, UpdateResult } from 'typeorm';
import { CreateAdressDto } from './dto/create-adress.dto';
import { Address } from './entities/adress.entity';
import { use } from 'passport';
import { UpdateAdressDto } from './dto/update-adress.dto';
import { update } from 'lodash';
import { UpdatDefaulteAdressDto } from './dto/update-default-addres.dto';

@Injectable()
export class AddressService implements RepositoryInterface<Address> {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>
  ) { }


  async getAllUserAddress(userId: string) {
    return await this.addressRepository.find({
      where: {
        user: {
          id: userId
        }
      },
      order: {
        createdAt: 'DESC'
      }
    });
  }

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

  async createAddress(createAddressDto: CreateAdressDto) {
    const { userId } = createAddressDto
    const [, address] = await Promise.all([
      this.update({ user: { id: userId } }, { isDefault: false }),
      this.addressRepository.save({
        ...createAddressDto,
        isDefault: true,
        user: {
          id: userId
        }
      })
    ])
    return address;

  }

  async updateDefaultAddress(id: string, updateDefaultAddressDto: UpdatDefaulteAdressDto) {

    const addressByid = await this.findOne({ where: { id }, relations: { user: true } })
    if (!addressByid) throw new NotFoundException('User not found');
    await this.update({ user: { id: addressByid.user.id } }, { isDefault: false })
    const address = await this.update({ id }, updateDefaultAddressDto)

    return { address }

  }
}



