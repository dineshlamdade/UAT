import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChildhostelallowanceService {
  public apiUrl = environment.baseUrl8085;

  constructor(private _HTTP: HttpClient) {}

  // Get Summary

  getSummaryTable() {
    return this._HTTP
      .get(this.apiUrl + 'childHostelAllowanceMaster/summary')
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  // Get Family Info
  getSummaryInfo(): Observable<any> {
    return this._HTTP
      .get(this.apiUrl + 'childHostelAllowanceMaster/summary')
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  // Get Computation
  getComputation(): Observable<any> {
    return this._HTTP
      .get(this.apiUrl + '/childHostelAllowanceMaster/computation')
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  //Master Services

  getCHAMaster(): Observable<any> {
    return this._HTTP.get(this.apiUrl + '/childHostelAllowanceMaster').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getFamilyInfo(): Observable<any> {
    return this._HTTP
      .get(this.apiUrl + '/licmaster-detail/familyMemberList')
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  postCHAMaster(data) {
    return this._HTTP
      .post(this.apiUrl + 'childHostelAllowanceMaster', data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
