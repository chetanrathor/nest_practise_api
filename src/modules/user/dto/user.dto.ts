import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import type { UserEntity } from '../entities/user.entity';
import { AbstractDto } from './../../../shared/dto/abstract.dto';

export class UserDto extends AbstractDto {
  @ApiPropertyOptional()
  fullName?: string;



  @ApiPropertyOptional()
  email?: string;

  @ApiProperty()
  mobileNumber?: string;

  @ApiProperty()
  countryCode?: string;

  @ApiProperty()
  isMobileVerified?: boolean;

  @ApiProperty()
  isEmailVerified?: boolean;

  @ApiPropertyOptional()
  emailOtp?: string;

  @ApiPropertyOptional()
  mobileOtp?: string;



  constructor(user: UserEntity) {
    super(user);
    this.fullName = user.fullName;
    this.mobileNumber = user.mobileNumber;
    this.email = user.email;
  }
}
