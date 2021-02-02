import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    
    let params = new URLSearchParams();
    params.append("employeeCode", employeeCode)
    return this.httpClient.put(environment.baseUrl8082 + '/employee-master/verify-personalMobile/' + mobileNoCountryCode + '/' + employeeCode,
      { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  validateOfficialEmailId(officialEmailId, employeeCode) {

    return this.httpClient.put(environment.baseUrl8082 + '/employee-master/verify-officialEmail/' + officialEmailId + '/' + employeeCode,
      { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  validatePersonalEmailId(PersonalEmailId, employeeCode) {
 
    let params = new URLSearchParams();
    params.append("employeeCode", employeeCode)

    return this.httpClient.put(environment.baseUrl8082 + '/employee-personal-info/verify-personalEmail/' + PersonalEmailId, params,
      { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }
}
