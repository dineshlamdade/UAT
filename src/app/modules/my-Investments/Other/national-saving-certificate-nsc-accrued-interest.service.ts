import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, of, BehaviorSubject , throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NationalSavingCertificateNSCAccruedInterestService {

  apiUrl = environment.apiBaseUrl;

  constructor(private _HTTP: HttpClient) { }
//Summary services
// getNSCAccrued() {
//   return this._HTTP.get(this.apiUrl + 'http://paylaptop99:8085/hrms/v1/nscAccruedInterestDetail')
//   .pipe(map((res: any) => {
//     return res;
//   }));
// }

// }

getNSCAccrued() {
  return this._HTTP.get(this.apiUrl + 'nscAccruedInterestDetail')
  .pipe(map((res: any) => {
    return res;
  }));
}

}