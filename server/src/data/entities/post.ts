import { Entity, Column } from 'typeorm';

import { AbstractEntity } from '../abstract/abstract.entity';

@Entity()
export class Post extends AbstractEntity {
    @Column({ type: 'varchar', length: 250 })
    username: string;

    @Column({ type: 'varchar', length: 50 })
    email: string;

    @Column({ type: 'varchar', length: 250, nullable: true })
    url: string;

    @Column({ type: 'varchar', length: 150 })
    image: string;

    @Column({ type: 'varchar', length: 150 })
    text: string;

    @Column({ type: 'varchar', length: 250, nullable: true })
    post_id: string;

    @Column({ type: 'varchar', length: 250, nullable: true })
    main_id: string;
}
