import { BaseEntity } from 'libs/common/entities';
import { Column, Entity, ManyToOne } from 'typeorm';
import { StatusEnums } from '../enums';
import { UsersEntity } from '@app/auth/lib/entities';

@Entity('orders')
export class OrdersEntity extends BaseEntity {
  @Column({ name: 'status', type: 'enum', enum: StatusEnums })
  status: string;

  @Column({ name: 'woocomerse_id', type: 'int', unique: true, nullable: false })
  woocomerceId: number;

  @Column({ name: 'amount', type: 'float', nullable: true })
  amount: number;

  @ManyToOne(() => UsersEntity, (user) => user.id, {
    nullable: false,
  })
  user: UsersEntity;
}
