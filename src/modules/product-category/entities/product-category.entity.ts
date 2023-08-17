import { AbstractEntity } from "../../../shared/entity/abstract.entity";
import { Product } from "../../../modules/product/entities/product.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity('categories')
export class ProductCategory extends AbstractEntity {
    @Column({ type: 'varchar' })
    name: string;

    @OneToMany((type) => Product, (product) => product.category)
    product: Product
}
