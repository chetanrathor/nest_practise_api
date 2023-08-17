import { Product } from "../modules/product/entities/product.entity";
import { AbstractEntityInterface } from "./abstract.interface";

export interface ProductRatingInterface extends AbstractEntityInterface {
    overall: number,
    average: number,
    reviews: number,
    product: Product
}