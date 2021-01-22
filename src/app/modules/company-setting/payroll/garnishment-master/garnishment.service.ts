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
  apiUrl1 = environment.baseUrl8087;
  apiUrl2 = environment.baseUrl8086;
  apiUrl3 = environment.baseUrl8083;
  apiUrl4 = environment.baseUrl8082;



  //post api for ganish master

  postGarnishmentMaster(data) {
    return this._HTTP.post(this.apiUrl + '/garnishment-master', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  // get api for ganish master
  getGarnishmentMaster() : Observable<any> {
    return this._HTTP.get(this.apiUrl + '/garnishment-master' ,{ headers: { 'X-TenantId': 'PaysquareDefault' } })
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

  // get api for ganish master
  getGarnishmentMasterDetailsbyId() : Observable<any> {
    return this._HTTP.get(this.apiUrl + '/garnishment-master/get/1007' ,{ headers: { 'X-TenantId': 'PaysquareDefault' } })
    .pipe(map((res: any) => {
      return res;
    }
    ));
  }

  updateGarnishmentMasterDetails(data) {
    return this._HTTP.post(this.apiUrl + '/garnishment-master/get/1', data)
    .pipe(map((res: any) => {
      return res;
    }));
  }

  
  deleteGarnishmentMasterDetails(): Observable<any> {
    return this._HTTP.get(this.apiUrl + '/garnishment-master/get/1')
    .pipe(map((res: any) => {
      return res;
    }));
  }


  


    // get api for sdm details
    getSDMdetails() : Observable<any> {
      return this._HTTP.get(this.apiUrl + '/companySDMForm' ,{ headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }
      ));
    }


     // get api for formula
     getFromuladetails() : Observable<any> {
      return this._HTTP.get(this.apiUrl + '/formula-master' ,{ headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }
      ));
    }

    
     // get api for Deduction
     getloanMasterAllDeductionHead() : Observable<any> {
      return this._HTTP.get(this.apiUrl1 + '/loan-Master/getDeduction' ,{ headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }
      ));
    }

    // get api for Loan Master Get All Earning Head
    // getloanMasterAllEarningHead() : Observable<any> {
    //   return this._HTTP.get(this.apiUrl + '/loan-Master/getEarning' ,{ headers: { 'X-TenantId': 'PaysquareDefault' } })
    //   .pipe(map((res: any) => {
    //     return res;
    //   }
    //   ));
    // }

     // get api for GET ALL FrequecyDetails.
     getALLFrequecyDetails() : Observable<any> {
      return this._HTTP.get(this.apiUrl2 + '/frequency-master' ,{ headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }
      ));
    }

    getInstitutionMaster() : Observable<any> {
      return this._HTTP.get(this.apiUrl3 + '/compliance-institution-master/details' ,{ headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }
      ));
    }

    getindianincometax() : Observable<any> {
      return this._HTTP.get(this.apiUrl + '/indian-income-tax' ,{ headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }
      ));
    }
    getAddressFromPIN(postalCode) {

      return this._HTTP.get(this.apiUrl4  + '/pincode-details-check' + postalCode, { headers: { 'X-TenantId': 'PaysquareGlobal' } })
        .pipe(map((res: any) => {
          return res;
        }))
    }
      getLocationInformationOrCountryList() {
  
        return this._HTTP.get(this.apiUrl4   + '/location-information/country', { headers: { 'X-TenantId': 'PaysquareGlobal' } })
          .pipe(map((res: any) => {
            return res;
          }))
      }




  
}