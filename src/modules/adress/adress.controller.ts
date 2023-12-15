import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { getSuccessResponse } from 'utils';
import { AddressService } from './adress.service';
import { CreateAdressDto } from './dto/create-adress.dto';
import { UpdateAdressDto } from './dto/update-adress.dto';

@Controller('adress')
export class AdressController {
  constructor(private readonly adressService: AddressService) { }

  @Post()
  async create(@Body() createAdressDto: CreateAdressDto) {
    try {

      const address = await this.adressService.createAddress(createAdressDto);
      return getSuccessResponse({ message: 'Address added', response: { address } })
    } catch (error: any) {
      throw new Error(error)
    }
  }

  // @Get()
  // findAll() {
  //   return this.adressService.findAll();
  // }

  @Get(':userId')
  async findAll(@Param('userId') id: string) {
    try {

      const data = await this.adressService.getAllUserAddress(id);
      return getSuccessResponse({ message: 'user address found', response: { data } })
    } catch (error) {

    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAdressDto: UpdateAdressDto) {
    try {
      
      const response = await this.adressService.updateDefaultAddress(id, updateAdressDto);
      return getSuccessResponse({ message: 'Address Updated Successfully', response })
    } catch (error: any) {
      throw new Error(error)
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adressService.remove(+id);
  }
}
