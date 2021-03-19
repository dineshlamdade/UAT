import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, of, BehaviorSubject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaxAdjustmentsService {
  apiUrl = environment.baseUrl8085;

  constructor(private _HTTP: HttpClient) {}

  //Summary services
  TaxAdjustmentsSummary() {
    return this._HTTP.get(this.apiUrl + 'additionalTaxAdjustment/summary').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  //Addition Tax services
  getAdditionalTax() {
    return this._HTTP.get(this.apiUrl + 'additionalTaxAdjustment').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  postAdditionalTax(data) {
    return this._HTTP.post(this.apiUrl + 'additionalTaxAdjustment', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getAdditionalTaxList() {
    return this._HTTP
      .get(this.apiUrl + 'additionalTaxAdjustment/payrollCycles')
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
