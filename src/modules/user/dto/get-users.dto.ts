import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";
import { RoleType, Status } from "../../../constants";
import { FilterDto } from "shared/dto/filter.dto";

export class GetUsersDTO extends FilterDto {

    @ApiProperty({ enum: Status, enumName: 'Status' })
    @IsEnum(Status)
    status: Status

    @ApiProperty({ enum: RoleType, enumName: 'RoleType' })
    @IsEnum(RoleType)
    role: RoleType
}