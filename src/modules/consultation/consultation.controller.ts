import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConsultationService } from './consultation.service';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';

@ApiTags('consultation')
@Controller('consultation')
export class ConsultationController {
  constructor(private readonly consultationService: ConsultationService) { }

  @Post()
  create(@Body() createConsultationDto: CreateConsultationDto) {
    return this.consultationService.create(createConsultationDto);
  }

  @Get()
  findAll() {
    return this.consultationService.findAndCount();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consultationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConsultationDto: UpdateConsultationDto) {
    return this.consultationService.update(+id, updateConsultationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consultationService.remove(+id);
  }
}
