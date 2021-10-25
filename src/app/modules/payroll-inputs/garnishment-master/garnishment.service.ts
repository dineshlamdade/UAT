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
  apiUrl5 = environment.baseUrl8085


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

  getCountryCodes():Observable<any>{
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('X-TenantId', 'PaysquareDefault');
    return this._HTTP.get(this.apiUrl4 + '/location-information/phone-code', { 'headers': headers })
      .pipe(map((res: any) => {
        return res;
      }));
  }

  // get api for PinCode
  getAddressFromPIN(postalCode): Observable<any> {
    return this._HTTP.get<any>(this.apiUrl4 + '/pincode-details-check/' + postalCode)
  }


  //get api for Deduction
  getloanMasterAllDeductionHead(): Observable<any> {
    return this._HTTP.get<any>(this.apiUrl1 + 'loan-Master/getDeduction' ,{ headers: { 'X-TenantId': 'PaysquareDefault' } })
  }

  //get api for GET ALL FrequecyDetails.
  getALLFrequecyDetails(): Observable<any> {
    return this._HTTP.get<any>(this.apiUrl2 + 'frequency-master/getAllActive')
  }


  // get api for IndianIncomeTex
  getindianincometax() : Observable<any> {
    return this._HTTP.get<any>(this.apiUrl5 + 'indian-income-tax' ,{ headers: { 'X-TenantId': 'PaysquareDefault' } })
  }

  /** Save master data */
  savemasterdata(data):Observable<any>{
    return this._HTTP.post<any>(this.apiUrl + 'garnishment-master',data)
  }

  /** Get data by id */
  masterDataGetById(garnishmentId):Observable<any>{
    return this._HTTP.get<any>(this.apiUrl + 'garnishment-master/GetbyId/'+garnishmentId)  
  }

  /** Update master data */
  updatemasterdata(data):Observable<any>{
    return this._HTTP.put<any>(this.apiUrl + 'garnishment-master/updateById',data)
  }

  /** Employee Data get By Id */
  employeeFinDetails(employeeMasterId):Observable<any>{
    return this._HTTP.get<any>(this.apiUrl4 + `employee-fin-details/`+ employeeMasterId); 
  }


  /************************************** Garnishment Transations/ Application **************************/

    /** Get application data */
    getApplicationSummary():Observable<any>{
      return this._HTTP.get<any>(this.apiUrl + `GarnishmentApplicationMaster`); 
    }

  /** Save application data */
  saveApplication(data):Observable<any>{
    return this._HTTP.post<any>(this.apiUrl + `GarnishmentApplicationMaster`, data); 
  }

  /** Update application data */
  updateApplication(data):Observable<any>{
    return this._HTTP.put<any>(this.apiUrl + `GarnishmentApplicationMaster/updateById`, data); 
  }

  /** Get application data by Id */
  getapplicationDataById(data):Observable<any>{
    return this._HTTP.post<any>(this.apiUrl + `GarnishmentApplicationMaster/GarnishmentApplicationMaster_GetbyId`, data); 
  }

  /** Get application history by Id */
  getApplicationHistoryById(data):Observable<any>{
    return this._HTTP.post<any>(this.apiUrl + `GarnishmentApplicationMaster/GarnishmentApplicationMasterHistoryAPI_ID`, data); 
  }


  /************************************** Garnishment Schedule **************************/

  /** Get Temp Schedule data */
  getTempSchedule(data):Observable<any>{
    return this._HTTP.post<any>(this.apiUrl + `GarnishmentApplicationMaster/TempSchedule`, data); 
  }

  /** Get All Application Schedule data */
  getApplicationScheduleData():Observable<any>{
    return this._HTTP.get<any>(this.apiUrl + `GarnishmentApplicationMasterSchedule`); 
  }

  /** Get scheduleHistory by Id */
  getScheduleHistoryById(data):Observable<any>{
    return this._HTTP.post<any>(this.apiUrl + `GarnishmentApplicationMasterSchedule/GarnishmentApplicationMasterSchedule_AppIdwise`, data); 
  }

  /** Update Schedule */
  updateSchedule(data):Observable<any>{
    return this._HTTP.put<any>(this.apiUrl + `GarnishmentApplicationMasterSchedule/updateById`, data); 
  }

  GarnishmentApplicationMasterScheduleRemarkHistory(data):Observable<any>{
    return this._HTTP.post<any>(this.apiUrl + `GarnishmentApplicationMasterScheduleRemarkHistory/GarnishmentApplicationMasterScheduleRemarkHistory`, data);  
  }


  /** E D Head  */
  payrollheadmaster():Observable<any>{
    return this._HTTP.get<any>(this.apiUrl + `payrollhead-master/global-getAll`)
  }


}