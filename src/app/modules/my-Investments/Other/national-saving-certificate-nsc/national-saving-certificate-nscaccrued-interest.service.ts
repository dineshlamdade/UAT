import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, of, BehaviorSubject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NationalSavingCertificateNSCAccruedInterestService {
  apiUrl = environment.baseUrl8085;

  constructor(private _HTTP: HttpClient) {}

  getNSCAccrued() {
    return this._HTTP.get(this.apiUrl + 'nscAccruedInterestDetail').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
