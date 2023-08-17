import { UserEntity } from '../../../modules/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../shared/entity/abstract.entity';

@Entity('adresses')
export class Address extends AbstractEntity {

    @Column({ type: 'boolean' })
    isDefault: boolean;

    @Column({ type: 'varchar' })
    title: string;

    @Column({ type: 'varchar' })
    recipientName: string;

    @Column({ type: 'varchar' })
    email: string;

    @Column({ type: 'varchar' })
    phone: string;

    @Column({ type: 'varchar' })
    state: string;

    @Column({ type: 'varchar' })
    city: string;

    @Column({ type: 'varchar' })
    zip: string;

    @Column({ type: 'varchar' })
    street_address: string;

    @ManyToOne(() => UserEntity, user => user.id)
    user: UserEntity;


}
