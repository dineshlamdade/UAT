import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ContactInformationService {

  constructor(private httpClient: HttpClient) { }


  postContactInfoForm(IdentityInformation) {

    return this.httpClient.post(environment.baseUrl8082 + '/employeeContact-information', IdentityInformation, { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getContactInfoData() {
    const empId = localStorage.getItem('employeeMasterId')
    var employeeMasterId = Number(empId);

    return this.httpClient.get(environment.baseUrl8082 + '/employeeContact-information/' + employeeMasterId)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getAddressFromPIN(postalCode) {

    return this.httpClient.get(environment.baseUrl8082 + '/pincode-details-check/' + postalCode, { headers: { 'X-TenantId': 'PaysquareGlobal' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  validatePersonalMobile(mobileNoCountryCode, employeeCode) {

    const params = new HttpParams().set('employeeCode', employeeCode);
    return this.httpClient.get(environment.baseUrl8082 + '/employee-master/verify-personalMobile/' + mobileNoCountryCode,
      { headers: { 'X-TenantId': 'PaysquareDefault' },params})
      .pipe(map((res: any) => {
        return res;
      }))
  }

  validateOfficialEmailId(officialEmailId, employeeCode) {

    const params = new HttpParams().set('employeeCode', employeeCode);
    return this.httpClient.get(environment.baseUrl8082 + '/employee-master/verify-officialEmail/' + officialEmailId,
      { headers: { 'X-TenantId': 'PaysquareDefault' },params})
      .pipe(map((res: any) => {
        return res;
      }))
  }

  validatePersonalEmailId(PersonalEmailId, employeeCode) {

    const params = new HttpParams().set('employeeCode', employeeCode);

    return this.httpClient.get(environment.baseUrl8082 + '/employee-personal-info/verify-personalEmail/' + PersonalEmailId,
      { headers: { 'X-TenantId': 'PaysquareDefault' },params})
      .pipe(map((res: any) => {
        return res;
      }))
  }
}
