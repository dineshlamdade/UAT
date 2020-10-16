import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class SharedInformationService {

  constructor(private httpClient: HttpClient) { }

  getLocationInformation() {

    return this.httpClient.get(environment.baseUrl8082 + '/location-information/country/', { headers: { 'X-TenantId': 'PaysquareGlobal' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getCountryCodes() {

    return this.httpClient.get(environment.baseUrl8082 + '/location-information/phone-code/', { headers: { 'X-TenantId': 'PaysquareGlobal' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }
}
