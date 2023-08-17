import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";
import { AuthDto } from "shared/dto/auth.dto";

export class SignInDTO extends AuthDto {
 
}