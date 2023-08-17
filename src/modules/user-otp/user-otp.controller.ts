import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserOtpService } from './user-otp.service';
import { CreateUserOtpDto } from './dto/create-user-otp.dto';
import { UpdateUserOtpDto } from './dto/update-user-otp.dto';

@Controller('user-otp')
export class UserOtpController {
  constructor(private readonly userOtpService: UserOtpService) { }

  // @Post()
  // create(@Body() createUserOtpDto: CreateUserOtpDto) {
  //   return this.userOtpService.create(createUserOtpDto);
  // }

  // @Get()
  // findAll() {
  //   return this.userOtpService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userOtpService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserOtpDto: UpdateUserOtpDto) {
  //   return this.userOtpService.update(+id, updateUserOtpDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userOtpService.remove(+id);
  // }
}
