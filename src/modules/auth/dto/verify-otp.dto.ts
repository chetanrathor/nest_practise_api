import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNumber, IsString, MaxLength, MinLength } from "class-validator"

export class VerifyOtpDTO {
    @ApiProperty({ example: 'chetan@mailinator.com' })
    @IsEmail()
    email: string

    @ApiProperty({ example: '121212' })
    @IsNumber()
    // @MaxLength(6)
    // @MinLength(6)
    otp: number







}