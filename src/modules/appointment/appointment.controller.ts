import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { GetAppointments } from './dto/get-appointment.dto';

@ApiTags('appointment')
@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) { }

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    try {

      return this.appointmentService.create(createAppointmentDto);
    } catch (error) {
      return {}
    }
  }


  @Get()
  findAll(@Query() getAppointmentsRequest: GetAppointments) {
    return this.appointmentService.getAll(getAppointmentsRequest);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.getOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
  //   return this.appointmentService.update(+id, updateAppointmentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.appointmentService.remove(+id);
  // }
}
