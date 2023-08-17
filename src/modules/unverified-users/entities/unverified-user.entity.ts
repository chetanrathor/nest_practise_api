import { RoleType, SignUpType } from "../../../constants";
import { Column, Entity } from "typeorm";
import { AbstractEntity } from "../../../shared/entity/abstract.entity";

@Entity('unverified_users')
export class UnverifiedUser extends AbstractEntity {

    @Column({ length: 255, nullable: true })
    fullName: string;

    @Column({ length: 80, })
    email: string;

    @Column({ length: 255 })
    password: string;

    @Column({ type: 'varchar', length: 255 })
    otp: number;

    @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
    role: RoleType;

    @Column({ type: 'enum', enum: SignUpType, default: SignUpType.EMAIL })
    signUpType: SignUpType;




}
