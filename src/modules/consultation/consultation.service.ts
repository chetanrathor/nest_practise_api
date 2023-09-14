import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cons } from 'rxjs';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { Consultation } from './entities/consultation.entity';

@Injectable()
export class ConsultationService {
  constructor(
    @InjectRepository(Consultation)
    private readonly consultationRepository: Repository<Consultation>
  ) { }
  create(createConsultationDto: CreateConsultationDto) {
    return 'This action adds a new consultation';
  }

  findAndCount(options?: FindManyOptions<Consultation>) {
    return this.consultationRepository.findAndCount(options)
  }

  findOne(id: number) {
    return `This action returns a #${id} consultation`;
  }

  update(id: number, updateConsultationDto: UpdateConsultationDto) {
    return `This action updates a #${id} consultation`;
  }

  remove(id: number) {
    return `This action removes a #${id} consultation`;
  }
}
