import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../../environments/environment';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class BankInformationService {

  constructor(private httpClient: HttpClient) { }

  postBankInfoForm(ReJoiningForm){
    // const body = { EmployeePersonalRequestDTO: personalInformationModel }

    return this.httpClient.post(environment.baseUrl8082 + '/employee-bank-info', ReJoiningForm, {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }
  putBankInfoForm(ReJoiningForm){
    // const body = { EmployeePersonalRequestDTO: personalInformationModel }

    return this.httpClient.put(environment.baseUrl8082 + '/employee-bank-info/update', ReJoiningForm, {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }

  getBankInformation(employeeMasterId){

    return this.httpClient.get(environment.baseUrl8082 + '/employee-bank-info/employeeMasterId/' + employeeMasterId, {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }

  getDataFromIFSC(bankIFSC){

    return this.httpClient.get(environment.baseUrl8082 + '/bank-master/data/' + bankIFSC, {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }

  searchIFSC(terms: any, stateModel) {
     return this.httpClient.get(environment.baseUrl8082 + '/bank-master/ifsc/' + stateModel + '/' + terms)
    .pipe(map((res: any) =>{
      return res;
    }))
  }
  getStates(){

    return this.httpClient.get(environment.baseUrl8082 + '/location-information/state/', {headers:{ 'X-TenantId': 'PaysquareGlobal'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }

  getAllIFSC(){

    return this.httpClient.get(environment.baseUrl8082 + '/bank-master/', {headers:{ 'X-TenantId': 'PaysquareGlobal'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }
  accountNoVerification(accountNo, employeeBankInfoId){

    return this.httpClient.get(environment.baseUrl8082 + '/employee-bank-info/verify-accountno/'+ employeeBankInfoId +'/' + accountNo, {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }
}
