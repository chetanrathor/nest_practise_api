import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString } from "class-validator"

export class AuthDto {
    @ApiProperty({ example: 'chetan@mailinator.com' })
    @IsEmail()
    email: string

    @ApiProperty()
    @IsString()
    password: string
}