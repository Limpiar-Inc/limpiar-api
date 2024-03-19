import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { EnvKey, Token } from 'libs/common/enums';

@Injectable()
export class JwtLibService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async sign<P extends Object | Buffer>(
    payload: P,
    type: Token = Token.ACCESS_TOKEN,
  ): Promise<string> {
    try {
      let token: string;
      switch (type) {
        case Token.ACCESS_TOKEN:
          token = await this.jwtService.signAsync(payload, {
            expiresIn: this.configService.get<string>(
              EnvKey.ACCESS_TOKEN_EXPIRES_AT,
            ),
            secret: this.configService.get<string>(EnvKey.ACCESS_TOKEN_SECRET),
          });

          break;
        case Token.REFRESH_TOKEN:
          token = await this.jwtService.signAsync(payload, {
            expiresIn: this.configService.get<string>(
              EnvKey.REFRESH_TOKEN_EXPIRES_AT,
            ),
            secret: this.configService.get<string>(EnvKey.REFRESH_TOKEN_SECRET),
          });
          break;
      }
      return token;
    } catch (err) {
      throw err;
    }
  }

  public getRefreshTokenExpirationTime(): Date {
    const currentDate = new Date();
    const expiresAt = new Date(currentDate.getTime() + 6 * 60 * 60 * 1000);
    return expiresAt;
  }

  public getAccessTokenExpirationTime(): Date {
    const currentDate = new Date();
    const expiresAt = new Date(currentDate.getTime() + 2 * 60 * 60 * 1000);
    return expiresAt;
  }

  public getAccessTokenMaxAge() {
    return 60 * 60 * 2;
  }

  public getRefreshTokenMaxAge() {
    return 60 * 60 * 6;
  }
}
