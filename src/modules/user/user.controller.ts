import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RoleType } from './../../constants';
import { AuthUser } from './../../decorators/auth-user.decorator';
import { Auth } from './../../decorators/http.decorator';
import { UserEntity } from './entities/user.entity';

@ApiTags('user')
@Controller('user')
export class UserController {
  @Auth([RoleType.USER])
  @Get('/')
  profile(@AuthUser() user: UserEntity) {
    return user;
  }
}
