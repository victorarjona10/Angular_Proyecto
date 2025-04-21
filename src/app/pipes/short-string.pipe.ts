import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortString'
})
export class ShortStringPipe implements PipeTransform {

  transform(value: string): string {

    // Check if the value is null or undefined
    if (value === null || value === undefined) {
      return value;
    }
 

    return value.length > 20 ? value.substring(0, 10) + '...' : value;
  }

}
