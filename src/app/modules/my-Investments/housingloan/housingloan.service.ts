import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of , throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HousingloanService {
  public apiUrl = environment.apiBaseUrl;
  constructor(private _HTTP: HttpClient) { }

  public submitHousingLoanMasterData(propertyIndex: File[], stampDutyRegistration: File[],
    losnSanctionLetter: File[], possessionLetter: File[], data: any): Observable<any> {
    let formData: any = new FormData();
    console.log('propertyIndex::', propertyIndex);
    console.log('stampDutyRegistration::', stampDutyRegistration);
    console.log('losnSanctionLetter::', losnSanctionLetter);
    console.log('possessionLetter::', possessionLetter);
    for (const propertyIndexFile of propertyIndex) {
      formData.append('propertyIndex', propertyIndexFile);
    }
    for (const stampDutyRegistrationFile of stampDutyRegistration) {
      formData.append('stampDutyRegistration', stampDutyRegistrationFile);
    }
    for (const losnSanctionLetterFile of losnSanctionLetter) {
      formData.append('losnSanctionLetter', losnSanctionLetterFile);
    }
    for (const possessionLetterFile of possessionLetter) {
      formData.append('possessionLetter', possessionLetterFile);
    }

    // formData.append('licDocuments', files);
    formData.append('housingLoanMaster', JSON.stringify(data));

    console.log('formData', formData);

    formData.forEach((value, key) => {
      console.log(key, ' ', value);
    });
    // return null;
    return this._HTTP.post<any>(
      this.apiUrl + 'housingLoanMaster',
      formData,
      {

      });
  }

  public getHousingLoanMaster(): Observable<any> {
    return this._HTTP.get(this.apiUrl + 'housingLoanMaster')
    .pipe(map((res: any) => {
      return res;
    },
    ));
  }

  public getPropertyNamesList(): Observable<any> {
    return this._HTTP.get(this.apiUrl + 'housePropertyTransaction/housePropertyNameList')
    .pipe(map((res: any) => {
      return res;
    },
    ));
  }
  public getHousePropertyFilterData(propertyName: String): Observable<any> {
    return this._HTTP.get(this.apiUrl + 'housePropertyTransaction/' + propertyName)
    .pipe(map((res: any) => {
      return res;
    }));
  }
}
