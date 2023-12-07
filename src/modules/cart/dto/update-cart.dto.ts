import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsString, IsUUID, IsNotEmpty } from 'class-validator';
import { CreateCartDto } from './create-cart.dto';

export class UpdateCartDto extends OmitType(CreateCartDto,['product','user']) {}
