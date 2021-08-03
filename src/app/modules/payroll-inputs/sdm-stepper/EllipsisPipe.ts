import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {
  public transform(value: string): string {
    // pick whatever number fits your need
    if (value.length > 10) {
      return value.substring(0, 10).concat('...');
    }
    return value;
  }
}
