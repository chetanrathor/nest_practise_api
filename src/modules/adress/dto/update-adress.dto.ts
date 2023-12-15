import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { CreateAdressDto } from './create-adress.dto';

export class UpdateAdressDto extends PartialType(CreateAdressDto) {

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    isDefault: boolean;

}
