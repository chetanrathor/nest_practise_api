import { PartialType } from '@nestjs/swagger';
import { CreateUnverifiedUserDto } from './create-unverified-user.dto';

export class UpdateUnverifiedUserDto extends PartialType(CreateUnverifiedUserDto) {}
