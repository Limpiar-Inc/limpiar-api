// import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  UnauthorizedException,
  Dependencies,
  Inject,
} from '@nestjs/common';
import { AuthLibService } from '@app/auth';
import { AUTH_SERVICE } from '@app/auth/lib/constants';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
@Dependencies(AuthLibService)
export class AccsesTokenStrategy extends PassportStrategy(
  Strategy,
  'accsess_token',
) {
  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: AuthLibService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, jwtPayload: { id: number; email: string }) {
    const user = await this.authService.validateUserById(jwtPayload.id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
