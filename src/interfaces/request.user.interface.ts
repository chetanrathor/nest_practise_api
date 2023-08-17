import { Request } from "express";
import { UserEntity } from "modules/user/entities/user.entity";
export interface UserRequest extends Request {
    user: UserEntity
}

