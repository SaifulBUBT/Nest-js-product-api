import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class PositiveIntPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const parsedValue = Number(value);

    if(!Number.isInteger(parsedValue) || parsedValue <= 0) {
      throw new BadRequestException('Value must be positive integer');
    }

    return parsedValue;
  }
}
