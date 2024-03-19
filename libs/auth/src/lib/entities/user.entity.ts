import { BaseEntity } from 'libs/common/entities';
import { Column, Entity } from 'typeorm';

@Entity()
export class UsersEntity extends BaseEntity {
  @Column({ name: 'user_name', unique: true })
  userName: string;

  @Column({ name: 'woocomerse_id', type: 'int' })
  woocomerceId: number;

  @Column({ name: 'mail', unique: true })
  email: string;

  @Column({ name: 'password' })
  password: string;
}
