import { Status } from "constants/status";

export interface AbstractEntityInterface {
    id:string,
    createdAt:Date,
    updatedAt:Date,
    deletedAt:Date,
    status:Status
} 