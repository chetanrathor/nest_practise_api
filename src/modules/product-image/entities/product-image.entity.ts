import { Product } from "../../../modules/product/entities/product.entity";
import { AbstractEntity } from "../../../shared/entity/abstract.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity('product_image')
export class ProductImage extends AbstractEntity {

    @Column({ type: 'varchar' })
    link: string;

    @ManyToOne((type) => Product, (product) => product.id)
    @JoinColumn({ name: 'product' })
    product: Product



}
