import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '.././../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User1 } from './lmsleave-head-creation-component/lmsleave-head-creation-component.component';
import {SaveLeaveAttributeCreation} from '../model/business-cycle-model';

@Injectable({
  providedIn: 'root'
})
export class LeaveHeadCreationService {
url= environment.baseUrl8093;
  constructor(private httpClient:HttpClient) { }

  getAllLeaveHeadCreation(){
    return this.httpClient.get(this.url + 'headMaster/', {headers:{ 'X-TenantId': 'PaysquareDefault'}})
    .pipe(map((res: any) =>{
      return res;
    }))
  }

  AddLeaveHeadCreation(data:User1): Observable<number | {}> {
    return this.httpClient.post(environment.baseUrl8093 + 'headMaster/create/', data)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  getAllLeaveAttributeCreation(){
    return this.httpClient.get(this.url + 'lmsAttributeMasterResource/').pipe(map((res : any) =>{
return res;
    }));
  }


  AddLeaveAttributeCreation(data:SaveLeaveAttributeCreation): Observable<number | {}> {
    console.log('Post Data',data);
    return this.httpClient.post(environment.baseUrl8093 + 'lmsAttributeMasterResource/', data)
      .pipe(map((res: any) => {
        return res;
      }));
  }

 UpdateLeaveAttributeCreation(data:SaveLeaveAttributeCreation): Observable<number | {}> {
    console.log('Post Data',data);
    return this.httpClient.put(environment.baseUrl8093 + 'lmsAttributeMasterResource/', data)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  DeleteAttributeLeaveCreation(id: number) {
    return this.httpClient.delete(this.url + 'lmsAttributeMasterResource/DeleteById/' + id)
      .pipe(map((res: any) => {
        return res;
      }));
  }


}
