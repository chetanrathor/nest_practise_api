import { AbstractEntity } from '../../../shared/entity/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity('blogs')
export class Blog extends AbstractEntity {


    @Column({ type: 'boolean', default: false })
    isUpdated: boolean;

    @Column({ type: 'varchar' })
    title: string;

    @Column({ type: 'varchar' })
    description: string;

    @Column({ type: 'varchar' })
    subTitle: string;

    @Column({ type: 'varchar' })
    heroImage: string;
}
