import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, of, BehaviorSubject , throwError } from 'rxjs';

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
  
  // get all master data
  getAllGarnishmentMaster() : Observable<any> {  
    return this._HTTP.get<any>(this.apiUrl + 'garnishment-master/GetAll')
  }
    
     // get api for Deduction
    //  getloanMasterAllDeductionHead() : Observable<any> {
    //   return this._HTTP.get(this.apiUrl1 + 'loan-Master/getDeduction')
    //   .pipe(map((res: any) => {
    //     return res;
    //   }
    //   ));
    // }

    

     // get api for GET ALL FrequecyDetails.
    //  getALLFrequecyDetails() : Observable<any> {
    //   return this._HTTP.get(this.apiUrl2 + 'frequency-master/getAllActive')
    //   .pipe(map((res: any) => {
    //     return res;
    //   }
    //   ));
   //    }
   
   // get api for institution Name.
    // getInstitutionMaster() : Observable<any> {
    //   return this._HTTP.get(this.apiUrl3 + 'compliance-institution-master/details' ,{ headers: { 'X-TenantId': 'PaysquareDefault' } })
    //   .pipe(map((res: any) => {
    //     return res;
    //   }
    //   ));
    // }

    // get api for compliance head Name.
    // getComplianceHeadNane() : Observable<any> {
    //   return this._HTTP.get(this.apiUrl3 + 'compliance-head/details' ,{ headers: { 'X-TenantId': 'PaysquareDefault' } })
    //   .pipe(map((res: any) => {
    //     return res;
    //   }
    //   ));
    // }

    // get api for IndianIncomeTex

    // getindianincometax() : Observable<any> {
    //   return this._HTTP.get(this.apiUrl + 'indian-income-tax' ,{ headers: { 'X-TenantId': 'PaysquareDefault' } })
    //   .pipe(map((res: any) => {
    //     return res;
    //   }
    //   ));
    // }

    // get api for PinCode
    // getAddressFromPIN(postalCode) {

    //   return this._HTTP.get(this.apiUrl4  + '/pincode-details-check/' + postalCode, { headers: { 'X-TenantId': 'PaysquareGlobal' } })
    //     .pipe(map((res: any) => {
    //       return res;
    //     }))
    // }
 
    // // get api for Country List
      // getLocationInformationOrCountryList() {
  
      //   return this._HTTP.get(this.apiUrl4   + '/location-information/country', { headers: { 'X-TenantId': 'PaysquareGlobal' } })
      //     .pipe(map((res: any) => {
      //       return res;
      //     }))
      // }  
}