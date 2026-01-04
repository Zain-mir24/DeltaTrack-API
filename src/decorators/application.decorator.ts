import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Application } from '../application/entities/application.entity';

export const CurrentApplication = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Application => {
    const request = ctx.switchToHttp().getRequest();
    return request.application;
  },
);

