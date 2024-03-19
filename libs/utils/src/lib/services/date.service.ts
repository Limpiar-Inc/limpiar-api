import { Injectable } from '@nestjs/common';

@Injectable()
export class DateService {
  public isValidDate(date: Date): boolean {
    return !isNaN(new Date(date).getTime());
  }
}
