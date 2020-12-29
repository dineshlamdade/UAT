import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { View } from '@ngneat/transloco';
import { ViewFlags } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root'
})
export class EmploymentInformationService {
  private subject = new Subject<any>();

  constructor(private httpClient: HttpClient) { }


  // Joining Information API Calls
  postJoiningInformation(JoiningInformationModel) {

    return this.httpClient.post(environment.baseUrl8082 + '/employment-info/joining', JoiningInformationModel, { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getJoiningInformation(employeeMasterId) {

    return this.httpClient.get(environment.baseUrl8082 + '/employment-info/joining/employeeMasterId/' + employeeMasterId, { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  updateJoiningInformation(JoiningInformationModel) {

    return this.httpClient.put(environment.baseUrl8082 + '/employment-info/joining/update', JoiningInformationModel, { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  // ReJoining Information API Calls
  postReJoiningInformation(ReJoiningInformationModel) {

    return this.httpClient.post(environment.baseUrl8082 + '/employment-info/rejoining', ReJoiningInformationModel, { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getReJoiningInformation(employeeMasterId) {

    return this.httpClient.get(environment.baseUrl8082 + '/employment-info/rejoining/employementInfoId/' + employeeMasterId, { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  updateReJoiningInformation(ReJoiningInformationModel) {

    return this.httpClient.put(environment.baseUrl8082 + '/employment-info/rejoining/update/', ReJoiningInformationModel, { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }


  // TransferTo Information API Calls
  postTransferToForm(TransferToInformation) {

    return this.httpClient.post(environment.baseUrl8082 + '/employee-transfer', TransferToInformation, { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }
  putTransferToForm(TransferToInformation, employeeTransferId) {

    return this.httpClient.put(environment.baseUrl8082 + '/employee-transfer/' + employeeTransferId, TransferToInformation, { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getTransferToInformation(employeeMasterId) {
    return this.httpClient.get(environment.baseUrl8082 + '/employee-transfer/' + employeeMasterId, { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  // Exit Information API Calls
  postExitForm(ExitInformation) {

    return this.httpClient.post(environment.baseUrl8082 + '/employee-exit', ExitInformation, { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }
  putExitForm(ExitInformation, employeeExitInfoId) {

    return this.httpClient.put(environment.baseUrl8082 + '/employee-exit/' + employeeExitInfoId, ExitInformation, { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getExitInformation(employeeMasterId) {

    return this.httpClient.get(environment.baseUrl8082 + '/employee-exit/' + employeeMasterId, { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getEmploymentInformationGridSummary(employeeMasterId) {

    return this.httpClient.get(environment.baseUrl8082 + '/employment-info/grid/employeeMasterId/' + employeeMasterId, { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getTransactionHistory(employeeMasterId) {

    return this.httpClient.get(environment.baseUrl8082 + '/employment-info/history/employeeMasterId/' + employeeMasterId, { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getPreviousStintInfoBySearch(employeeCode) {

    return this.httpClient.get(environment.baseUrl8082 + '/employment-info/search/' + employeeCode, { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getExitStatus(employeeMasterId) {

    return this.httpClient.get(environment.baseUrl8082 + '/employee-exit/status/' + employeeMasterId, { headers: { 'X-TenantId': 'PaysquareDefault' } })
      .pipe(map((res: any) => {
        return res;
      }))
  }

  //get Group company information
  getCompanyInformation() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('X-TenantId', 'PaysquareDefault');
    return this.httpClient.get(environment.baseUrl8083 + '/companymaster/getAllAtGroup', { headers: headers })
      .pipe(map((res: any) => {
        return res;
      }))
  }


  sendId(number: number) {
    this.subject.next({ text: number });
  }

  getNumber(): Observable<any> {
    return this.subject.asObservable();
  }

  getViewFlag() {
    return this.subject.asObservable();
  }
  setViewFlag(viewFlag) {
    this.subject.next(viewFlag);
  }
}
