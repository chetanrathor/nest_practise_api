import { ProductRatingInterface } from "interfaces";
import { Product } from "../../../modules/product/entities/product.entity";
import { AbstractEntity } from "../../../shared/entity/abstract.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity('product_ratings')
export class ProductRating extends AbstractEntity {
    @Column({ type: 'numeric' })
    overall: number;

    @Column({ type: 'numeric' })
    average: number;

    @Column({ type: 'numeric' })
    reviews: number;

    @OneToOne((type) => Product, (product) => product.id)
    @JoinColumn({ name: 'product' })
    product: Product

}
