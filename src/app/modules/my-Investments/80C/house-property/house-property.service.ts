import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, of, BehaviorSubject , throwError } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class HousePropertyService {
 apiUrl = environment.baseUrl8085;

  constructor(private _HTTP: HttpClient) { }

   //House Property Stamp Duty services

   getHousePropertyStampDuty() {
    return this._HTTP.get(this.apiUrl + 'housingLoanMaster/stampDutyInfoOther')
    .pipe(map((res: any) => {
      return res;
    }));
  }
}
