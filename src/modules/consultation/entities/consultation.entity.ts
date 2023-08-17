import { ConsultancyStatus, MeetingStatus } from '../../../constants';
import { Appointment } from '../../../modules/appointment/entities/appointment.entity';
import { UserEntity } from '../../../modules/user/entities/user.entity';
import { AbstractEntity } from '../../../shared/entity/abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity('consultations')
export class Consultation extends AbstractEntity {

    @Column({ type: 'date' })
    startTime: Date;

    @Column({ type: 'date' })
    endTime: Date;

    @Column('numeric')
    total: number;

    @Column({ type: 'enum', enum: MeetingStatus, enumName: 'MeetingStatus' })
    meetingStatus: MeetingStatus;

    @Column({ type: 'enum', enum: ConsultancyStatus, enumName: 'ConsultancyStatus' })
    consultancyStatus: ConsultancyStatus;

    @ManyToOne(() => UserEntity, user => user.id)
    vet: UserEntity;

    @OneToOne(() => Appointment, appointment => appointment.id)
    @JoinColumn()
    appointment: Appointment;


}
