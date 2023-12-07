import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsString, IsUUID, IsNotEmpty } from 'class-validator';
import { CreateCartDto } from './create-cart.dto';
import { UpdateCartDto } from './update-cart.dto';

export class DeleteCart extends OmitType(UpdateCartDto,['quantity']) {

    @ApiProperty()
    @IsString()
    @IsUUID()
    @IsNotEmpty()
    id: string
}
