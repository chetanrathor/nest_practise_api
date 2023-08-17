import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductRating } from "../entities/product-rating.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductRatingRepository {
    constructor(
        @InjectRepository(ProductRating)
        private readonly productRatingRepo: Repository<ProductRating>
    ) { }

    // findOne()
}