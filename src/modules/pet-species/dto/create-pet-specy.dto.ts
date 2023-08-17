import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreatePetSpecyDto {
    @ApiProperty()
    @IsString()
    name: string
}
