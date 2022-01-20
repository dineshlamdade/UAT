import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';


// let token = this.authservice.getJwtToken()
// const headers = new HttpHeaders()
// .set('X-Authorization', token);

@Injectable({
  providedIn: 'root'
})
export class UserRolesPermissionService {

  public apiUrl = environment.baseUrl8080;

  constructor(private _HTTP: HttpClient,private authservice : AuthService) { }

  /**get employee Id , company id from token sub id */

  employeeRoleAssignmentUser(subId){
    let token = this.authservice.getJwtToken()
    const headers = new HttpHeaders()
    .set('X-Authorization', token);
     
return this._HTTP.get(environment.baseUrl8080 + 'employeeRoleAssignment/user/'+subId,{ headers: headers })
      .pipe(map((res: any) => {
     
        
         return res;
      }));
  }

  // getByCompanyGroupMaster(companyGroupMasterId) {
  //   let token = this.authservice.getJwtToken()
  //   const headers = new HttpHeaders()
  //   .set('X-Authorization', token);
   
  // return this._HTTP.get(environment.baseUrl8080 + 'user-role/getBycompanyGroupMasterId/'+companyGroupMasterId,{ headers: headers })
  //     .pipe(map((res: any) => {
       
        
  //        return res;
  //     }));
  //   }

    getByCompanyGroupMaster(data) {
      return this._HTTP.post(environment.baseUrl8080 + 'user-role/getBycompanyGroupMasterId', data)
        .pipe(map((res: any) => {
          return res;
        }));
    } 

    getUserGroupForRoleGroup(companyGroupMasterId) {
      let token = this.authservice.getJwtToken()
      const headers = new HttpHeaders()
     
       .set('X-Authorization', token);

      
      return this._HTTP.get(environment.baseUrl8080 +'user-group/getByCompanyGroupId/'+companyGroupMasterId,{ headers: headers } )
        .pipe(map((res: any) => {
          return res;
        }));
      }

      postUserRollData(data) { 
          //alert("1: " +JSON.stringify(companyGroupMasterId))
       

        let token = this.authservice.getJwtToken()
        const headers = new HttpHeaders()
        .set('X-Authorization', token);
       // let companyId = companyGroupMasterId.companyGroupMasterId
        return this._HTTP.post(environment.baseUrl8080 + 'user-role', data,{ headers: headers })
          .pipe(map((res: any) => {
            return res;
          }));
      }
      updateUserRollData(data) {
        //alert(companyGroupMasterId)
       // let companyId = companyGroupMasterId.companyGroupMasterId
        let token = this.authservice.getJwtToken()
        const headers = new HttpHeaders()
        .set('X-Authorization', token);
        return this._HTTP.put(environment.baseUrl8080 +'user-role', data,{ headers: headers })
          .pipe(map((res: any) => {
            return res;
          }));
      }
      //--------------start user group API-----------------------------
       //--------------G user group API-----------------------------

      getAllUserGroupData(companyGroupMasterId) {
      let token = this.authservice.getJwtToken()
 
        const headerDict = {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Headers': '*',
         'X-Authorization': token,
        }
        
     
     
        return this._HTTP.get<any>( environment.baseUrl8080 +'user-group/getByCompanyGroupId/'+companyGroupMasterId,{ headers: headerDict})
          // .pipe(map((res: any) => {
          //   return res;
          // }));
        }

        //----------------user-group/getAllUserGroupsByCompanyGroups---------------

        postUserGroupGetAllUserGroupsByCompanyGroups(data) {
          return this._HTTP.post(environment.baseUrl8080 + 'user-group/getAllUserGroupsByCompanyGroups', data)
            .pipe(map((res: any) => {
              return res;
            }));
        } 


        //----------------Post---user-group--Add-- update---------------

        postUserGroupData(data) {
          return this._HTTP.post(environment.baseUrl8080 + 'user-group', data)
            .pipe(map((res: any) => {
              return res;
            }));
        } 

           //----------------Post---user-group/getAllDistinctByCompanyGroups---------------

           postUserroupGetAllDistinctByCompanyGroups(data) {
            return this._HTTP.post(environment.baseUrl8080 + 'user-group/getAllDistinctByCompanyGroups', data)
              .pipe(map((res: any) => {
                return res;
              }));
          } 

          //-----------------Post  user-group/getUserGroups -------   
          postUserroupGetAllDefaultCompanyGroups(data){
            return this._HTTP.post(environment.baseUrl8080 + 'user-group/getUserGroups', data)
            .pipe(map((res: any) => {
              return res;
            }));
          }

         
         
//----------------Post---Assign/UnAssign company group list---------------
           postUserGroupGetAllCompanyGroupsByUserGroup(data) {
            return this._HTTP.post(environment.baseUrl8080 + 'user-group/getAllCompanyGroupsByUserGroup', data)
              .pipe(map((res: any) => {
                return res;
              }));
          }

            //----------------Post---get Assigned Company GroupsByUserGroupName for pop up---------------

            postUserGroupGetAssignedCompanyGroupsByUserGroupName(data) {
              return this._HTTP.post(environment.baseUrl8080 + 'user-group/getAssignedCompanyGroupsByUserGroupName', data)
                .pipe(map((res: any) => {
                  return res;
                }));
            }

            // getJwtToken() {
            //   return sessionStorage.getItem(this.JWT_TOKEN);
            // }

            // getprivileges() {
            //   return jwt_decode(sessionStorage.getItem(this.JWT_TOKEN));
            // }

}
