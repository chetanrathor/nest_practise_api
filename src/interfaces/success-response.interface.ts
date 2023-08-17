import { HttpStatus } from "@nestjs/common/enums";


export interface SuccessResponse<T> {
    statusCode: HttpStatus.OK,
    response: T,
    message: string
}