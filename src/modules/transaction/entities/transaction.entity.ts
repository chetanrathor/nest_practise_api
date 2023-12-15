import { UserEntity } from '../../../modules/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../shared/entity/abstract.entity';
import { TransactionStatus } from '../../../constants/transaction-status';

@Entity('transactions')
export class Transaction extends AbstractEntity {


    @Column({ type: 'varchar' })
    stripeKey: string;

    @Column('numeric')
    amount: number;

    @Column({
        type: 'enum',
        enum: TransactionStatus,
        default: TransactionStatus.PENDING
    })
    transactionStatuc: TransactionStatus;


    @ManyToOne(() => UserEntity, user => user.id)
    user: UserEntity;




}
