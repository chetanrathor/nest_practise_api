import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RoleType } from './../../constants';
import { AuthUser } from './../../decorators/auth-user.decorator';
import { Auth } from './../../decorators/http.decorator';
import { UserEntity } from './entities/user.entity';
import { GetUsersDTO } from './dto/get-users.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('/')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Auth([RoleType.USER])
  @Get('/')
  profile(@AuthUser() user: UserEntity) {
    return user;
  }


  @Get('users')
  getUsers(@Query() getUsersDto: GetUsersDTO) {
    return this.userService.getUsers(getUsersDto)
  }
}
