import { ProductRating } from "../../../modules/product-rating/entities/product-rating.entity";
import { BreedType, InStock } from "../../../constants";
import { AbstractEntity } from "../../../shared/entity/abstract.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { ProductBrand } from "../../../modules/product-brand/entities/product-brand.entity";
import { ProductCategory } from "../../../modules/product-category/entities/product-category.entity";
import { PetSpecy } from "../../../modules/pet-species/entities/pet-specy.entity";
import { ProductImage } from "../../../modules/product-image/entities/product-image.entity";

@Entity('products')
export class Product extends AbstractEntity {

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'numeric' })
    discount: number;

    @Column({ type: 'numeric' })
    mrp: number;

    @Column({ type: 'numeric' })
    sellingPrice: number;

    @Column({ type: 'enum', enum: BreedType })
    breedType: BreedType;

    @Column({ type: 'varchar' })
    description: string;

    @Column({ type: 'boolean' })
    isOnSale: boolean;

    @Column({ type: 'enum', enum: InStock })
    inStock: InStock;



    @OneToOne((type) => ProductRating, (rating) => rating.product)
    productRating: ProductRating

    @OneToMany((type) => ProductImage, (image) => image.product)
    productImage: ProductImage[]

    @ManyToOne((type) => ProductBrand, (brand) => brand.id)
    @JoinColumn({ name: 'brand' })
    brand: ProductBrand

    @ManyToOne((type) => ProductCategory, (category) => category.id)
    @JoinColumn({ name: 'category' })
    category: ProductCategory

    @ManyToOne((type) => PetSpecy, (specy) => specy.id)
    @JoinColumn({ name: 'specy' })
    specy: PetSpecy

}

