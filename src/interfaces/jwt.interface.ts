import { RoleType } from "../constants";

export interface JwtSignPayload{
    id:string,
    role:RoleType,

}