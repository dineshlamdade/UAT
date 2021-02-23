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
  apiUrlBussinessCycle = environment.baseUrl8086;

  //public apiUrl = 'http://localhost:8088/hrms/v1/';

constructor(private http: HttpClient) { }


getCertificateMaster(): Observable<any>  {
  return this.http.get(this.apiUrl + 'certificate-master/')
    .pipe(map((res: any) => {
      return res;
    }));
}

getFrequencyMaster(): Observable<any>  {
  return this.http.get(this.apiUrlBussinessCycle + 'frequency-master/')
    .pipe(map((res: any) => {
      return res;
    }));
}

postCertificateMaster(data): Observable<any>  {
  return this.http.post(this.apiUrl + 'certificate-master/', data)
    .pipe(map((res: any) => {
      return res;
    }));
}
putCertificateMaster(data): Observable<any>  {
  return this.http.put(this.apiUrl + 'certificate-master/', data)
    .pipe(map((res: any) => {
      return res;
    }));
}

deleteCertificateMaster(data){
  return this.http.delete(this.apiUrl + 'certificate-master/'+ data)
  .pipe(map((res: any) => {
    return res;
  }));
}

getSdmApplicationModule() {
  return this.http.get(this.apiUrl + 'source-derived-matrix/derived-module-mapping/certificate/sdmMasterId/')
  .pipe(map((res: any) => {
    return res;
  }));
}

}
