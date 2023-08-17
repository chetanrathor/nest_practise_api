import { UserEntity } from '../../../modules/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../shared/entity/abstract.entity';

@Entity('transactions')
export class Transaction extends AbstractEntity {


    @Column({ type: 'varchar' })
    stripeKey: string;

    @Column('numeric')
    amount: number;

    @ManyToOne(() => UserEntity, user => user.id)
    user: UserEntity;


}
