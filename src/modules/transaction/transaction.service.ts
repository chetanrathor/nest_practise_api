import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService {

  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) { }
  async create(createTransactionDto: DeepPartial<Transaction>) {
    return await this.transactionRepository.save(createTransactionDto)
  }

  async findAndCount(options?: FindManyOptions<Transaction>) {
    return await this.transactionRepository.findAndCount(options)
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  async update(option:FindOptionsWhere<Transaction>,data:DeepPartial<Transaction>) {
    return await this.transactionRepository.update(option, data)
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
