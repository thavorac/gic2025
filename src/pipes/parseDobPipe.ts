import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseDobPipe implements PipeTransform {
  transform(value: string) {
    if (typeof value !== 'string') {
      throw new BadRequestException('Validation failed: dob must be a string');
    }
    const m = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (!m) {
      throw new BadRequestException(
        'Validation failed: dob must be in the format dd/mm/yyyy',
      );
    }
    const year = Number(m[3]);
    const month = Number(m[2]);
    const day = Number(m[1]);
    if (year > 2010) {
      throw new BadRequestException('Year must be less than or equal to 2010');
    }
    if (month > 12) {
      throw new BadRequestException('Month must be between 1 and 12');
    }
    if (day > 31) {
      throw new BadRequestException('Day must be between 1 and 31');
    }
    const dob = new Date(`${m[3]}-${m[2]}-${m[1]}`);
    return dob;
  }
}
