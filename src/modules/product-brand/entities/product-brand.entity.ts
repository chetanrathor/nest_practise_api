import { Product } from "../../../modules/product/entities/product.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { AbstractEntity } from "../../../shared/entity/abstract.entity";

@Entity('brands')
export class ProductBrand extends AbstractEntity {
    @Column({ type: 'varchar' })
    name: string;

    @OneToMany((type) => Product, (product) => product.brand)
    product: Product[]

}
