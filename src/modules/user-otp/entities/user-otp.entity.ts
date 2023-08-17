import { UserEntity } from "../../../modules/user/entities/user.entity";
import { AbstractEntity } from "../../../shared/entity/abstract.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity('user_otps')
export class UserOtp extends AbstractEntity {

    @Column('numeric')
    otp: number

    @ManyToOne((type) => UserEntity, (user) => user.email)
    user: UserEntity


}
