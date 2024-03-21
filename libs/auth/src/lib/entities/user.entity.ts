import { OrdersEntity } from '@app/orders-lib/lib/entities';
import { BaseEntity } from 'libs/common/entities';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('users')
export class UsersEntity extends BaseEntity {
  @Column({ name: 'user_name', unique: true })
  userName: string;

  @Column({ name: 'woocomerse_id', type: 'int', unique: true })
  woocomerceId: number;

  @Column({ name: 'mail', unique: true })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @OneToMany(() => OrdersEntity, (order) => order.user)
  orders: OrdersEntity[];
}
