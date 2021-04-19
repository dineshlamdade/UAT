import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PayrollInputsService {
public apiUrl = environment.baseUrl8084;
constructor(private http: HttpClient) { }

getFinancialMasterSummary() {

  return this.http.get(this.apiUrl + 'NonRecurringTransactionGroup')
    .pipe(map((res: any) => {
      return res;
    }));
  }

getFinancialMasterSchedule() {

  let params = new FormData();
  params.append('nonRecurringTransactionGroupId', '3');
  return this.http.post(this.apiUrl + 'NonRecurringTransactionSchedule/NonRecurringTransactionScheduleEMP', params)
    .pipe(map((res: any) => {
      return res;
    }));
  }

getFinancialMasterTransaction() {
  let params = new FormData();
  params.append('nonRecurringTransactionScheduleId', '11');
  params.append('nonRecurringTransactionGroupId', '3');
  console.log(params);
  return this.http.post(this.apiUrl + 'NonRecurringTransactionScheduleRemarkHistory/NonRecurringTransactionScheduleRemarkHistorybyScheduleId', params)
    .pipe(map((res: any) => {
      return res;
    }));
  }

postLeavePage(data) {
  return this.http.post(this.apiUrl + 'leave-master', data)
    .pipe(map((res: any) => {
      return res;
    }));
}
}
