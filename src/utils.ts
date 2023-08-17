import { BadRequestException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { createHmac } from 'crypto';
import { SuccessResponse } from 'interfaces/success-response.interface';
import { isNumber } from 'lodash';
import { off } from 'process';

import { NEST_SECRET } from './config';

export function cryptoPassword(password: string) {
  const hmac = createHmac('sha256', NEST_SECRET);

  return hmac.update(password).digest('hex');
}

export function getSuccessResponse(payload: { message: string, response: any }): SuccessResponse<any> {
  return { statusCode: HttpStatus.OK, ...payload, }
}

export function isValidNumber(str: string): boolean {
  // Parse the input string to a number
  const numberValue = parseFloat(str);

  // Check if the parsed number is a valid finite number
  if (!isNaN(numberValue) && isFinite(numberValue)) {
    console.log('Parsed number:', numberValue); // Log the parsed number
    return true;
  }

  console.log('Invalid number:', str); // Log the original input if not a valid number
  return false;
}


export function processPagination(options: { limit: string, offset: string }) {
  const { limit, offset } = options
  if (isValidNumber(limit) === false) {

    throw new BadRequestException('limit is not a valid number')
  }

  if (isValidNumber(offset) === false) {
    throw new BadRequestException('offset is not a valid number')
  }

  return { take: Number(limit), skip: Number(offset) }
}
