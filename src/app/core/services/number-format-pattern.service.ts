import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NumberFormatPatternService {

  constructor(private router: Router,
    ) { }

    keyPress(event: any) {
      const pattern = /[0-9]/;

      let inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode != 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }
    }

  // constructor() { }
}
