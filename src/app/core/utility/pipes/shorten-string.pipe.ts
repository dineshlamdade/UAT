import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenString',
})
export class ShortenStringPipe implements PipeTransform {

  transform(value: string): string {
    if (value.length > 10) {
      return value.substr(0, 10) + '...';
    }
    return value;

  }


}
