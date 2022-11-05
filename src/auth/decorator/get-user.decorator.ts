import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * How to use:
 *
 * @GetUser()
 * Return User model
 *
 * @GetUser('id')
 * Return user id from model
 */
export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();
    if (data) {
      return request.user[data];
    }
    return request.user;
  },
);
