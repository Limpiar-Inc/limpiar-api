import { UsersEntity } from '@app/auth/lib/entities';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export interface RequestWithUser<T extends UsersEntity> extends Request {
  user: T;
}
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UsersEntity => {
    const request: RequestWithUser<UsersEntity> = ctx
      .switchToHttp()
      .getRequest();
    return request.user;
  },
);
