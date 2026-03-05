import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseDobPipe implements PipeTransform {
  transform(value: string) {
    const dob = new Date(value);
    if (isNaN(dob.getTime())) {
      throw new BadRequestException('Invalid date of birth');
    }
    return dob;
  }
}
