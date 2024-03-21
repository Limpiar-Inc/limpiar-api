import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdersEntity } from '../entities';
@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(OrdersEntity)
    public readonly OrdersEntity: Repository<OrdersEntity>,
  ) {}

  async findAll(): Promise<OrdersEntity[]> {
    return await this.OrdersEntity.find();
  }

  async findOne(id: number): Promise<OrdersEntity | undefined> {
    return await this.OrdersEntity.findOne({ where: { id: id } });
  }

  async create(user: Partial<OrdersEntity>): Promise<OrdersEntity> {
    return await this.OrdersEntity.save(user);
  }

  async update(
    id: number,
    user: Partial<OrdersEntity>,
  ): Promise<OrdersEntity | undefined> {
    await this.OrdersEntity.update(id, user);
    return await this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.OrdersEntity.delete(id);
  }
}
