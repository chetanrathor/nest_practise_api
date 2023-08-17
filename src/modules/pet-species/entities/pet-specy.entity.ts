import { Product } from "../../../modules/product/entities/product.entity";
import { AbstractEntity } from "../../../shared/entity/abstract.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity('species')
export class PetSpecy extends AbstractEntity {
    @Column({ type: 'varchar' })
    name: string;

    @OneToMany((type) => Product, (product) => product.specy)
    product: Product[]
}
