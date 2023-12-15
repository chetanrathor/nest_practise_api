import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty } from "class-validator";

export class UpdatDefaulteAdressDto{

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    isDefault: boolean;

}
