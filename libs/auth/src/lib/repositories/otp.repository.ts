import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OtpEntity } from '../entities/otp.entity';

@Injectable()
export class OtpRepository {
  constructor(
    @InjectRepository(OtpEntity)
    public readonly otpEntity: Repository<OtpEntity>,
  ) {}

  async findAll(): Promise<OtpEntity[]> {
    return await this.otpEntity.find();
  }

  async findOne(id: number): Promise<OtpEntity | undefined> {
    return await this.otpEntity.findOne({ where: { id: id } });
  }

  async create(user: Partial<OtpEntity>): Promise<OtpEntity> {
    return await this.otpEntity.save(user);
  }

  async update(
    id: number,
    user: Partial<OtpEntity>,
  ): Promise<OtpEntity | undefined> {
    await this.otpEntity.update(id, user);
    return await this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.otpEntity.delete(id);
  }
}
