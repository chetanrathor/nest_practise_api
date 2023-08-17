import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsString } from "class-validator";
import { AuthDto } from "shared/dto/auth.dto";
import { RoleType, SignUpType } from "../../../constants";

export class SignUpDTO extends AuthDto {
   
    @ApiProperty()
    @IsString()
    fullName: string


    @ApiProperty({ enum: RoleType, enumName: 'RoleType', example: RoleType.USER })
    @IsEnum(RoleType)
    role: RoleType

    @ApiProperty({ enum: SignUpType, enumName: 'SignUpType', example: SignUpType.EMAIL })
    @IsEnum(SignUpType)
    signUpType: SignUpType

    



}