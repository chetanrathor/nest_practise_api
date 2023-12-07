import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";
import { RoleType, Status } from "../../../constants";
import { FilterDto } from "shared/dto/filter.dto";

export class GetUsersShippings extends OmitType(FilterDto, ['search']) { }
export class GetUsersOrders extends OmitType(FilterDto, ['search']) { }
export class GetUsersConsultations extends OmitType(FilterDto, ['search']) { }