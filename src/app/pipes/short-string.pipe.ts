import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortString'
})
export class ShortStringPipe implements PipeTransform {

  transform(value: string): string {
    return value.length > 20 ? value.substring(0, 10) + '...' : value;
  }

}
