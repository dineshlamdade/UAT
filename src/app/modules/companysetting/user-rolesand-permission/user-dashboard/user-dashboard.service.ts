import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../auth/auth.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserDashboardService {

  public apiUrl = environment.baseUrl8080;

  constructor(private _HTTP: HttpClient,private authservice : AuthService) { }

  ////----userLogin--Api

  employeeRoleAssignmentUser(subId){
    let token = this.authservice.getJwtToken()
    const headers = new HttpHeaders()
    .set('X-Authorization', token);
     
return this._HTTP.get(environment.baseUrl8080 + 'employeeRoleAssignment/user/'+subId,{ headers: headers })
      .pipe(map((res: any) => {
       // console.log(res);
        
         return res;
      }));
  }
///////----get--All--CompanyGROUP--Master-Api------------

  // getAllEmployeeRoleAssignmentBycompanyGroupMasterId(subId){
  //   let token = this.authservice.getJwtToken()
  //   // console.log(token);
  //  const headers = {
  //        'Content-Type': 'application/json',
  //        'Accept': 'application/json',
  //        'Access-Control-Allow-Headers': 'Content-Type',
  //        'X-Authorization': token,
  //      }
  //   return this._HTTP.get<any>(environment.baseUrl8080 +'employeeRoleAssignment/company/'+subId,{ headers: headers })
  //   .pipe(map((res: any) => {
  //     // console.log(res);
      
  //      return res;
  //   })); 
  // }

/////--------------empoyeeRoleAssigment BY Company Group id-------------

 getAllEmployeeRoleAssignmentBycompanyGroupId(companyGroupMasterId): Observable<any>{ 
    return this._HTTP.get<any>(environment.baseUrl8080 +'employeeRoleAssignment/group/'+companyGroupMasterId)
  }


  employeeRoleAssignmentDashboard(subId): Observable<any>{ 
    return this._HTTP.get<any>(environment.baseUrl8080 +'employeeRoleAssignment/dashboard/user/'+subId)
  }


  



////------------employeeRoleAssignment---Page---Size--------------

  

  getAllEmployeeRoleAssignment(page,size): Observable<any>{ 
      return this._HTTP.get<any>(environment.baseUrl8080 +'employeeRoleAssignment/?page='+page+'&size='+size)
    }




  ///////----get--All--Company--Master-Api------------

  getAllEmployeeRoleAssignmentByCompanyId(globalCompanyMasterId){
    let token = this.authservice.getJwtToken()
    //console.log(token);
   const headers = {
         'Content-Type': 'application/json',
         'Accept': 'application/json',
         'Access-Control-Allow-Headers': 'Content-Type',
         'X-Authorization': token,
       }
       return this._HTTP.get<any>(environment.baseUrl8080 +'employeeRoleAssignment/company/'+globalCompanyMasterId,{ headers: headers } )
       .pipe(map((res: any) => {
        //console.log(res);
        
         return res;
      }));
  }
 

  //-----------UserGroupList---------------API----------------------

  getUserGroupName(companyGroupMasterId) {
    let token = this.authservice.getJwtToken()
    const headers = new HttpHeaders()
   
     .set('X-Authorization', token);

     //console.log("headers::", headers)
    return this._HTTP.get(environment.baseUrl8080 +'user-group/getByCompanyGroupId/'+companyGroupMasterId,{ headers: headers } )
      .pipe(map((res: any) => {
        return res;
      }));
    }
 

/////=-----------------------Summary-------API--------
    getSummaryData(companyGroupMasterId){
      let token = this.authservice.getJwtToken()
      // console.log(token);
     const headers = {
           'Content-Type': 'application/json',
           'Accept': 'application/json',
           'Access-Control-Allow-Headers': 'Content-Type',
           'X-Authorization': token,
         }
      return this._HTTP.get<any>(environment.baseUrl8080 +'employeeRoleAssignment/company/'+companyGroupMasterId,{ headers: headers } ) 
      .pipe(map((res: any) => {
       // console.log(res);
        
         return res;
      }));
     }

///////-----------also Summary-----------API
     getEmployeeMasterCode() {
    
      // return this._HTTP.get<any>(environment.baseUrl8082 +'employee-master/'+employeeId)
      return this._HTTP.get<any>(environment.baseUrl8082 +'employee-master/all/active')
       
      }
//////////--------GetUserRole-----------API---------

      getByUserRole(companyGroupMasterId) {
        let token = this.authservice.getJwtToken()
        const headers = new HttpHeaders()
        .set('X-Authorization', token);
        //  console.log("headers::", headers)
    
      return this._HTTP.get(environment.baseUrl8080 + 'user-role/getByCompanyGroupId/'+companyGroupMasterId,{ headers: headers })
          .pipe(map((res: any) => {
            //console.log(res);
            
             return res;
          }));
        }

      // getByCompanyGroupMaster(data) {
      //   return this._HTTP.post(environment.baseUrl8080 + 'user-role/getBycompanyGroupMasterId', data)
      //     .pipe(map((res: any) => {
      //       return res;
      //     }));
      // } 
  
      /////-------Add--AssignGroupAndRole----API
 
   public addUserRoleWithCompany(data)
   {
     return this._HTTP.post<any>(this.apiUrl  +'employeeRoleAssignment/',data);
   }
  /////------Update--AssignGroupAndRole----API
   updateAssignmentUserRoleWithEmployee(data)
   {
     return this._HTTP.put<any>(this.apiUrl  +'employeeRoleAssignment/' ,data);
   }


   deleteAssignmentRoleId(employeeRoleAssignmentId){
    return this._HTTP.delete<any>(this.apiUrl  +'employeeRoleAssignment/' + employeeRoleAssignmentId);
   }

}
