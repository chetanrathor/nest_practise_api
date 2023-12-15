import { Order } from '../../../modules/order/entities/order.entity';
import { Product } from '../../../modules/product/entities/product.entity';
import { AbstractEntity } from '../../../shared/entity/abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('order_items')
export class OrderItem extends AbstractEntity {

   

    @ManyToOne(() => Product, product => product.id)
    @JoinColumn({name:'product_id'})
    product: Product;

    @ManyToOne(() => Order, order => order.id)
    @JoinColumn({name:'order_id'})
    order: Order;

    @Column('numeric')
    quantity: number;
}
