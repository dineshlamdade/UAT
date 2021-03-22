import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RolePrivilegeService {
 
  public apiUrl = environment.baseUrl8080;

  constructor(private _HTTP: HttpClient,private authservice : AuthService) { }

  //---------------employeeRoleAssignmentApi------------------------

  getEmployeeRoleAssignment(){
    let token = this.authservice.getJwtToken()
    console.log(token);
    const headers = {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Headers': 'Content-Type',
          //'X-Authorization': token,
        }
  return this._HTTP.get<any>(environment.baseUrl8080 +'employeeRoleAssignment/user/3',{ headers: headers } )
  }
  //---------------user-group/getByCompanyGroupIdApi------------------------
  getByCompanyGroupId(){
    return this._HTTP.get<any>(environment.baseUrl8080 +'user-group/getByCompanyGroupId/12' )
  }
   //---------------user-role/getByCompanyGroupMasterIdApi------------------------

  userRoleGetByCompanyGroupMasterId(){
    return this._HTTP.get<any>(environment.baseUrl8080 +'user-role/getBycompanyGroupMasterId/12' )
  }
   //---------------user-role/getCompanyName&IdApi------------------------
getCompanyId(){
    return this._HTTP.get<any>(environment.baseUrl8080 +'employeeRoleAssignment/user/3' )
  }
  getApplicationMenusData(){
    return this._HTTP.get<any>(environment.baseUrl8080 +'applicationMenus/' ) 
  }


 getUserRolePrivilegesByUserRoleId(){
  return this._HTTP.get<any>(environment.baseUrl8080 +'userRolePrivilegesMatrix/12' ) 
 }


 public addUserRolePrivilege(data)
 {
   return this._HTTP.post<any>(this.apiUrl  +'userRolePrivilegesMatrix/' ,data);
 }

 public updateUserRolePrivilege(data)
 {
   return this._HTTP.post<any>(this.apiUrl  +'userRolePrivilegesMatrix/' ,data);
 }

 

}
