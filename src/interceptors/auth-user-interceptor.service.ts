import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';

import type { UserEntity } from '../modules/user/entities/user.entity';
import { ContextProvider } from '../providers';

@Injectable()
export class AuthUserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    console.log('request', request)
    const user = <UserEntity>request.user;
    console.log('request', request.user)
    ContextProvider.setAuthUser(user);

    return next.handle();
  }
}
