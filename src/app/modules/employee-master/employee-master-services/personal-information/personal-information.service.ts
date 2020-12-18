import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../../../../environments/environment';
// import { environment } from '@src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonalInformationService {

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


  postPersonalInfoForm(personalInformationModel) {
    // const body = { EmployeePersonalRequestDTO: personalInformationModel }

    return this.httpClient.post(environment.baseUrl8082 + '/employee-personal-info', personalInformationModel, { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }
  updatePersonalInfoForm(personalInformationModel, employeeMasterId) {
    return this.httpClient.put(environment.baseUrl8082 + '/employee-personal-info/update/', personalInformationModel, { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getEmployeeData(employeeMasterId) {

    return this.httpClient.get(environment.baseUrl8082 + '/employee-personal-info/employeeMasterId/' + employeeMasterId)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getImage(employeeMasterId) {
    return this.httpClient.get(environment.baseUrl8082 + '/image-upload/employeeMasterId/' + employeeMasterId)
      .pipe(map((res: any) => {
        return res;
      }))
  }

}
