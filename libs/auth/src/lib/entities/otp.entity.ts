import { BaseEntity } from 'libs/common/entities';
import { Column, Entity } from 'typeorm';

@Entity()
export class OtpEntity extends BaseEntity {
  @Column({ name: 'otp', unique: true })
  otp: string;

  @Column({ name: 'mail', unique: true })
  email: string;
}
