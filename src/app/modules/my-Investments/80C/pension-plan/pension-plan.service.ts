import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, of, BehaviorSubject , throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PensionPlanService {
  apiUrl = environment.apiBaseUrl;

  constructor(private _HTTP: HttpClient) { }


  getEightyCSummary() {
    return this._HTTP.get(this.apiUrl + 'pensionPlanmaster-detail/pensionPlanmasterSummary')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

  postEightyCSummaryFuturePolicy(data) {

    return this._HTTP.post(this.apiUrl + 'pensionPlanmaster-detail/pensionPlanMasterSummaryFuturePolicy', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getEightyCMaster() : Observable<any> {
    return this._HTTP.get(this.apiUrl + 'pensionPlanmaster-detail')
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

}

