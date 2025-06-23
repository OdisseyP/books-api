import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import slugify from 'slugify';

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

  generateFullName() {
    this.fullName = `${this.firstName} ${
      this.middleName ? this.middleName + ' ' : ''
    }${this.lastName}`;
  }

  generateSlug() {
    const fullName = `${this.firstName} ${
      this.middleName ? this.middleName + ' ' : ''
    }${this.lastName}`;
    this.slug = slugify(fullName, { lower: true });
  }
}
