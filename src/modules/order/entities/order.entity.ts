import { UserEntity } from '../../../modules/user/entities/user.entity';
import { AbstractEntity } from '../../../shared/entity/abstract.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { PaymentType } from '../../../constants';
import { OrderItem } from '../../order-item/entities/order-item.entity';

@Entity('orders')
export class Order extends AbstractEntity {


    @Column('numeric')
    total: number;

    @Column('numeric')
    shippingCharge: number;

    @Column({ type: 'varchar', enum: PaymentType, enumName: 'payment_type' })
    paymentType: PaymentType;

    @ManyToOne(() => UserEntity, user => user.id)
    user: UserEntity;

    @OneToMany(() => OrderItem, orderItem => orderItem.order)
    orderItems: OrderItem[];
}
