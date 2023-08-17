import { UserEntity } from '../../../modules/user/entities/user.entity';
import { AbstractEntity } from '../../../shared/entity/abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Consultation } from 'modules/consultation/entities/consultation.entity';

@Entity('appointments')
export class Appointment extends AbstractEntity {


    @Column({ type: 'varchar' })
    fullName: string;

    @Column({ type: 'varchar' })
    email: string;

    @Column({ type: 'varchar' })
    phone: string;

    @Column({ type: 'varchar' })
    city: string;

    @Column({ type: 'varchar' })
    problem: string;

    @ManyToOne(() => UserEntity, user => user.id)
    user: UserEntity;

    @OneToOne(() => Consultation, consultation => consultation.appointment)
    consultation: Consultation;

}
