import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'numberFormat',
 })
export class NumberFormatPipe implements PipeTransform {

        transform(value: number | string, minFractionDigits: number = 2, maxFractionDigits: number = 2, locale: string = 'en-IN'): string {

         value = value.toString().replace(/,/g, '');
        // console.log(`value:`, value);
         let formatedvalue = new Intl.NumberFormat(locale, {
            minimumFractionDigits: minFractionDigits,
            maximumFractionDigits: maxFractionDigits,
           }).format(Number(value));
        //  console.log(`formatedvalue:`, formatedvalue);
         return formatedvalue;
    }
}
