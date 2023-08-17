import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class CreateAppointmentDto {

    @ApiProperty()
    @IsString()
    fullName: string

    @ApiProperty()
    @IsString()
    @IsEmail()
    email: string

    @ApiProperty()
    @IsString()
    phone: string

    @ApiProperty()
    @IsString()
    city: string

    @ApiProperty()
    @IsString()
    problem: string

}
