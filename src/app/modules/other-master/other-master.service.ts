import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, of , throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OtherMasterService {
  apiUrl = environment.baseUrl8083;
  //public apiUrl = 'http://localhost:8088/hrms/v1/';

constructor(private http: HttpClient) { }


getCertificateMaster(): Observable<any>  {
  return this.http.get(this.apiUrl + 'certificate-master/')
    .pipe(map((res: any) => {
      return res;
    }));
}

postCertificateMaster(data): Observable<any>  {
  return this.http.post(this.apiUrl + 'certificate-master', data)
    .pipe(map((res: any) => {
      return res;
    }));
}
putCertificateMaster(data): Observable<any>  {
  return this.http.put(this.apiUrl + 'certificate-master', data)
    .pipe(map((res: any) => {
      return res;
    }));
}
getCompanyGroupMaster() {
  const headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('X-TenantId', 'PaysquareDefault');
  return this.http.get(this.apiUrl + '/companygroup-master', { 'headers': headers })
    .pipe(map((res: any) => {
      return res;
    }));
}
}
