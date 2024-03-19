import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from '../entities';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UsersEntity)
    public readonly usersEntity: Repository<UsersEntity>,
  ) {}

  async findAll(): Promise<UsersEntity[]> {
    return await this.usersEntity.find();
  }

  async findOne(id: number): Promise<UsersEntity | undefined> {
    return await this.usersEntity.findOne({ where: { id: id } });
  }

  async create(user: Partial<UsersEntity>): Promise<UsersEntity> {
    return await this.usersEntity.save(user);
  }

  async update(
    id: number,
    user: Partial<UsersEntity>,
  ): Promise<UsersEntity | undefined> {
    await this.usersEntity.update(id, user);
    return await this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.usersEntity.delete(id);
  }
}
