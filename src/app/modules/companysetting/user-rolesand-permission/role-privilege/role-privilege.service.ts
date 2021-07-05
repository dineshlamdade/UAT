import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolePrivilegeService {
 
  public apiUrl = environment.baseUrl8080;

  constructor(private _HTTP: HttpClient,private authservice : AuthService) { }

  employeeRoleAssignmentUser(subId){
    let token = this.authservice.getJwtToken()
    const headers = new HttpHeaders()
    .set('X-Authorization', token);
     
    return this._HTTP.get(environment.baseUrl8080 + 'employeeRoleAssignment/user/'+subId,{ headers: headers })
      .pipe(map((res: any) => {
  
         return res;
      }));
  }

  //---------------employeeRoleAssignmentApi------------------------

  getEmployeeRoleAssignment(subId){
     let token = this.authservice.getJwtToken()
    
    const headers = {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Headers': 'Content-Type',
          'X-Authorization': token,
        }
  return this._HTTP.get<any>(environment.baseUrl8080 +'employeeRoleAssignment/user/'+subId,{ headers: headers })
  .pipe(map((res: any) => {
   
    
     return res;
  }));
  }
  //---------------user-group/getByCompanyGroupIdApi------------------------
  getByCompanyGroupId(companyGroupMasterId){
    let token = this.authservice.getJwtToken()
    const headers = new HttpHeaders()
    .set('X-Authorization', token);
    return this._HTTP.get<any>(environment.baseUrl8080 +'user-group/getByCompanyGroupId/'+companyGroupMasterId,{ headers: headers })
    .pipe(map((res: any) => {
     
      
       return res;
    }));
  }
   //---------------user-role/getByCompanyGroupMasterIdApi------------------------

  userRoleGetByCompanyGroupMasterId(companyGroupMasterId){
    let token = this.authservice.getJwtToken()
    const headers = new HttpHeaders()
    .set('X-Authorization', token);
    

  return this._HTTP.get(environment.baseUrl8080 + 'user-role/getByCompanyGroupId/'+companyGroupMasterId,{ headers: headers })
      .pipe(map((res: any) => {
       
        
         return res;
      }));
  }
   //---------------user-role/getCompanyName&IdApi------------------------
getCompanyId(companyGroupMasterId){
  let token = this.authservice.getJwtToken()
    const headers = new HttpHeaders()
    .set('X-Authorization', token);
    return this._HTTP.get<any>(environment.baseUrl8080 +'employeeRoleAssignment/user/'+companyGroupMasterId,{ headers: headers } )
    .pipe(map((res: any) => {
      return res;
    }));
  }

  getApplicationMenusData(){
    let token = this.authservice.getJwtToken()
    
        const headerDict = {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Headers': '*',
         'X-Authorization': token,
        }
    return this._HTTP.get<any>(environment.baseUrl8080 +'applicationMenus/',{ headers: headerDict} ) 
    .pipe(map((res: any) => {
      return res;
    }));
  }


 getUserRolePrivilegesByUserRoleId(page,size){
  let token = this.authservice.getJwtToken()
  const headers = new HttpHeaders()
  .set('X-Authorization', token);
  return this._HTTP.get<any>(environment.baseUrl8080 +'userRolePrivilegesMatrix/?page='+page+'&size='+size, { headers: headers }) 
  .pipe(map((res: any) => {
    return res;
  }));
 }

 getUserPrivilegeByRoleId(userRoleId){
  
  let token = this.authservice.getJwtToken()
  const headers = new HttpHeaders()
  .set('X-Authorization', token);
  return this._HTTP.get<any>(environment.baseUrl8080 +'userRolePrivilegesMatrix/'+userRoleId, { headers: headers }) 
  .pipe(map((res: any) => {
    return res;
  }));
 }

/////////-------Get Summary ---Data--------------

getSummaryData(page,size): Observable<any>{ 
  return this._HTTP.get<any>(environment.baseUrl8080 +'userRolePrivilegesMatrix/?page='+page+'&size='+size)
}
public addUserRolePrivilege(data)
 {
   return this._HTTP.post<any>(this.apiUrl  +'userRolePrivilegesMatrix/' ,data);
 }

 public updateUserRolePrivilege(data)
 {
   return this._HTTP.put<any>(this.apiUrl  +'userRolePrivilegesMatrix/' ,data);
 }


 ///////---------FeildLabel------API---------Start-----------

// -------------- getAllFieldData---------------

getAllField(){
  return this._HTTP.get<any>(environment.baseUrl8080 + 'formField/getAllField');
}
 

}
