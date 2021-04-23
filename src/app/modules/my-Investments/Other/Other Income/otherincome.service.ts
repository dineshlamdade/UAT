import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, of, BehaviorSubject, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OtherincomeService {
  apiUrl = environment.baseUrl8085;

  constructor(private _HTTP: HttpClient) {}
  //Summary services
  OtherIncomeSummary() {
    return this._HTTP.get(this.apiUrl + 'OtherIncome/summary').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  //Other Income services
  getOtherIncome() {
    return this._HTTP.get(this.apiUrl + 'OtherIncome').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  postOtherIncome(data) {
    return this._HTTP.post(this.apiUrl + 'OtherIncome', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
