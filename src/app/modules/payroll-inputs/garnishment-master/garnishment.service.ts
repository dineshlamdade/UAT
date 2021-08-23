import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, of, BehaviorSubject, throwError } from 'rxjs';

const headers = new Headers({
  "Content-Type": "application/json",
  "X-TenantId": "PaysquareDefault"
});

@Injectable({
  providedIn: 'root'
})
export class GarnishmentService {
  constructor(private _HTTP: HttpClient) { }
  apiUrl = environment.baseUrl8084;

  apiUrl1 = environment.baseUrl8087;
  apiUrl2 = environment.baseUrl8086;
  apiUrl3 = environment.baseUrl8083;
  apiUrl4 = environment.baseUrl8082;

  // get all master data
  getAllGarnishmentMaster(): Observable<any> {
    return this._HTTP.get<any>(this.apiUrl + 'garnishment-master/GetAll')
  }

  // get api for compliance head Name.
  getComplianceHeadNane(): Observable<any> {
    // ,{ headers: { 'X-TenantId': 'PaysquareDefault' } }
    return this._HTTP.get(this.apiUrl3 + 'compliance-head/details')
  }

  // get api for institution Name.
  getInstitutionMaster(): Observable<any> {
    return this._HTTP.get(this.apiUrl3 + 'compliance-institution-master/details')
  }

  // get api for Country List
  getLocationInformationOrCountryList(): Observable<any> {
    return this._HTTP.get<any>(this.apiUrl4 + '/location-information/country')
  }

  // get api for PinCode
  getAddressFromPIN(postalCode): Observable<any> {
    return this._HTTP.get<any>(this.apiUrl4 + '/pincode-details-check/' + postalCode)
  }


  //get api for Deduction
  getloanMasterAllDeductionHead(): Observable<any> {
    return this._HTTP.get<any>(this.apiUrl1 + 'loan-Master/getDeduction')
  }

  //get api for GET ALL FrequecyDetails.
  getALLFrequecyDetails(): Observable<any> {
    return this._HTTP.get(this.apiUrl2 + 'frequency-master/getAllActive')
  }


  // get api for IndianIncomeTex

  // getindianincometax() : Observable<any> {
  //   return this._HTTP.get(this.apiUrl + 'indian-income-tax' ,{ headers: { 'X-TenantId': 'PaysquareDefault' } })
  //   .pipe(map((res: any) => {
  //     return res;
  //   }
  //   ));
  // }



}