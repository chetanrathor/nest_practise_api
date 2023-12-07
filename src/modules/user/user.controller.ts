import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RoleType } from './../../constants';
import { AuthUser } from './../../decorators/auth-user.decorator';
import { Auth } from './../../decorators/http.decorator';
import { UserEntity } from './entities/user.entity';
import { GetUsersDTO } from './dto/get-users.dto';
import { UserService } from './user.service';
import { GetUsersConsultations, GetUsersOrders, GetUsersShippings } from './dto/get-users-profile.dto';

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

  @Get('users/:userId/shippings')
  getUserShippings(@Query() getUserShippingsDTO: GetUsersShippings, @Param('userId') userId: string) {
    return this.userService.getUserShippings(userId,getUserShippingsDTO)
  }

  @Get('users/:userId/orders')
  getUserOrders(@Query() getUserOrders: GetUsersOrders, @Param('userId') userId: string) {
    return this.userService.getUserOrders(userId,getUserOrders)
  }

  @Get('users/:userId/consultation')
  getUserConsultation(@Query() getUserConsultation: GetUsersConsultations, @Param('userId') userId: string) {
    return this.userService.getUserConsultations(userId,getUserConsultation)
  }
}
