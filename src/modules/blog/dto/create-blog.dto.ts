import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateBlogDto {

    @ApiProperty()
    @IsString()
    title: string

    @ApiProperty()
    @IsString()
    subTitle: string

    @ApiProperty()
    @IsString()
    description: string

    @ApiProperty()
    @IsString()
    heroImage: string


}
