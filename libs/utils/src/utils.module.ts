import { Module } from '@nestjs/common';
import { utilsLibProviders } from './lib/providers';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [...utilsLibProviders, JwtService],
  exports: [...utilsLibProviders, JwtService],
})
export class UtilsModule {}
