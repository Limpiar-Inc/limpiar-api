import { UsersEntity } from '@app/auth/lib/entities';
import { OtpEntity } from '@app/auth/lib/entities/otp.entity';
import { ConfigService } from '@nestjs/config';
const fs = require('fs');
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// console.log(process.env.POSTGRES_PORT)
export const getDatabaseConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  return {
    type: 'postgres',
    host: 'limpiar_postgres',
    port: +configService.get<number>('POSTGRES_PORT'),
    username: configService.get('POSTGRES_USER'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DB'),
    // entities: ['dist/**/*.entity.js'],
    entities: [UsersEntity, OtpEntity],

    synchronize: true,
  };
};
