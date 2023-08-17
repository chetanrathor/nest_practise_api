import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UnverifiedUsersService } from './unverified-users.service';
import { CreateUnverifiedUserDto } from './dto/create-unverified-user.dto';
import { UpdateUnverifiedUserDto } from './dto/update-unverified-user.dto';

@Controller('unverified-users')
export class UnverifiedUsersController {
  constructor(private readonly unverifiedUsersService: UnverifiedUsersService) { }

  // @Post()
  // create(@Body() createUnverifiedUserDto: CreateUnverifiedUserDto) {
  //   return this.unverifiedUsersService.create(createUnverifiedUserDto);
  // }

  // @Get()
  // findAll() {
  //   return this.unverifiedUsersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.unverifiedUsersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUnverifiedUserDto: UpdateUnverifiedUserDto) {
  //   return this.unverifiedUsersService.update(+id, updateUnverifiedUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.unverifiedUsersService.remove(+id);
  // }
}
