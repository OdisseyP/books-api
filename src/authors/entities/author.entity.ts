import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { slugify } from '../../common/utils';

@Entity('authors')
export class Author extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  middleName?: string;

  @Column()
  fullName: string;

  @Column()
  slug: string;

  @Column({ type: 'text', nullable: true })
  bio?: string;
}
