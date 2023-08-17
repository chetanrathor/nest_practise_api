import { DeepPartial, FindManyOptions, FindOneOptions, FindOptionsWhere, UpdateResult } from "typeorm"

export interface RepositoryInterface<T> {
    findAndCount(options: FindManyOptions<T>): Promise<[T[], number]>,
    findOne(options: FindOneOptions<T>): Promise<T | null>
    save(data: DeepPartial<T> | DeepPartial<T>[]): Promise<T | T[]>
    update(criteria: FindOptionsWhere<T>, data: Partial<T>): Promise<UpdateResult>
}