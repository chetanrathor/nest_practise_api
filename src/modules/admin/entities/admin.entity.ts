import { RoleType } from "../../../constants";
import { AbstractEntity } from "../../../shared/entity/abstract.entity";
import { Column, Entity } from "typeorm";

@Entity('admin')
export class Admin extends AbstractEntity {
    @Column({ type: 'varchar' })
    email: string

    @Column({ type: 'varchar' })
    password: string

    @Column({ type: 'enum', enum: RoleType, default: RoleType.ADMIN })
    role: RoleType

}
