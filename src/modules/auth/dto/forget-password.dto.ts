import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsEmail } from "class-validator";
import { AuthDto } from "shared/dto/auth.dto";

export class ForgetPasswordRequest extends OmitType(AuthDto, ['password']) {
    @ApiProperty()
    @IsEmail()
    email: string
}