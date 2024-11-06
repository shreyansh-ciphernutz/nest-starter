import { BaseEntity } from '../../base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'citext' })
  email: string;

  @Column({ type: 'citext' })
  name: string;

  @Column({ type: 'text', select: false })
  password: string;

  @Column({ nullable: true, type: 'citext' })
  phone: string;

  @Column({ nullable: true, type: 'smallint' })
  age: string;
}
