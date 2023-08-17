import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'modules/user/entities/user.entity';
import { FindManyOptions, FindOneOptions, FindOptionsWhere, ILike, Repository, UpdateResult } from 'typeorm';
import { getSuccessResponse, processPagination } from 'utils';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { GetAppointments } from './dto/get-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';

@Injectable()
export class AppointmentService {
    constructor(
        @InjectRepository(Appointment)
        private readonly appointmentRepository: Repository<Appointment>,

    ) { }

    async findAndCount(options: FindManyOptions<Appointment>): Promise<[Appointment[], number]> {
        return await this.appointmentRepository.findAndCount(options);
    }

    async findOne(options: FindOneOptions<Appointment>): Promise<Appointment | null> {
        return await this.appointmentRepository.findOne(options);
    }

    async save(data: Partial<Appointment> | Partial<Appointment>[]): Promise<Appointment | Appointment[]> {
        if (Array.isArray(data)) {
            return await this.appointmentRepository.save(data);
        } else {
            return await this.appointmentRepository.save(data, {});
        }
    }

    async update(criteria: FindOptionsWhere<Appointment>, data: Partial<Appointment>): Promise<UpdateResult> {
        return await this.appointmentRepository.update(criteria, data);
    }

    async remove(criteria: FindOptionsWhere<Appointment>): Promise<UpdateResult> {
        return await this.appointmentRepository.softDelete(criteria);
    }

    async create(createAppointmentDto: CreateAppointmentDto) {
        await this.save(createAppointmentDto)
        return getSuccessResponse({ message: 'Appointment created successfull.', response: {} })
    }

    async getAll(getAppointmentsRequest: GetAppointments) {

        const { limit, offset, order, search } = getAppointmentsRequest
        const { skip, take } = processPagination({ limit, offset })
        const where: FindOptionsWhere<Appointment>[] | FindOptionsWhere<Appointment> = []
        if (search) {
            const items = [
                { email: ILike(`%${search}%`) },
                { fullName: ILike(`%${search}%`) },
                { city: ILike(`%${search}%`) },
                { problem: ILike(`%${search}%`) }
            ]
            where.push(...items)
        }

        const [data, totalCount] = await this.findAndCount({ skip, take, order: { createdAt: order } })


        return getSuccessResponse({ message: 'Appointmenst fetched successfull', response: { data, totalCount } })
    }

    async getOne(id: string) {
        const appointment = await this.findOne({ where: { id } })
        let response = {}
        if (appointment) {
            response = { appointment }
        }
        return getSuccessResponse({ message: 'Appointment fetch successfull', response })

    }
}