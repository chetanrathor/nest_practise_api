import { OmitType } from '@nestjs/swagger';
import { FilterDto } from 'shared/dto/filter.dto';

export class ReadCart extends OmitType(FilterDto, ['search', 'order']) {}
