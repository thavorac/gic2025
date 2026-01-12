import { BadRequestException, PipeTransform } from '@nestjs/common';

export class DobPipe implements PipeTransform {
  transform(value: any) {
    // 1. Check if value is a string
    if (typeof value !== 'string') {
      throw new BadRequestException('dob must be a string');
    }
    // 2. Check if the string has format "dd/mm/yyyy" => 23/02/2005
    const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (!match) {
      throw new BadRequestException('dob must have format dd/mm/yyyy');
    }
    const year = Number(match[3]);
    const month = Number(match[2]);
    const day = Number(match[1]);

    if (day < 1 || day > 31) {
      throw new BadRequestException('dob day must be between 1 and 31');
    }

    if (month < 1 || month > 12) {
      throw new BadRequestException('dob month must be between 1 and 12');
    }
    // 3. Check if the date is < 2010
    if (year && year >= 2010) {
      throw new BadRequestException('dob year must be less than 2010');
    }
    return value;
  }
}
