import { Product } from "../../../modules/product/entities/product.entity";
import { UserEntity } from "../../../modules/user/entities/user.entity";
import { AbstractEntity } from "../../../shared/entity/abstract.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity('cart')
export class Cart extends AbstractEntity {

    @Column({ name: 'quantity' })
    quantity: number

    @ManyToOne(() => UserEntity, (user) => user.id)
    @JoinColumn({ name: 'user' })
    user: UserEntity

    @ManyToOne(() => Product, (product) => product.id)
    @JoinColumn({ name: 'product' })
    product: Product
}
