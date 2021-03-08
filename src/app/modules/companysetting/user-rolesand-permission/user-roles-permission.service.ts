import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const headers = new Headers({
  "Content-Type": "application/json"
});

@Injectable({
  providedIn: 'root'
})
export class UserRolesPermissionService {

  public apiUrl = environment.baseUrl8080;

  constructor(private _HTTP: HttpClient) { }

  getByCompanyGroupMaster() {
    return this._HTTP.get('http://localhost:8080/hrms/v1/user-role/getBycompanyGroupMasterId/12' ,{ headers: { 'Content-Type': 'application/json' } })
      .pipe(map((res: any) => {
        return res;
      }));
    }

    getUserGroupForRoleGroup() {
      return this._HTTP.get('http://localhost:8080/hrms/v1/user-group/getByCompanyGroupId/12' ,{ headers: { 'Content-Type': 'application/json' } })
        .pipe(map((res: any) => {
          return res;
        }));
      }

      postUserRollData(data) {
        return this._HTTP.post(environment.baseUrl8080 + 'user-role', data)
          .pipe(map((res: any) => {
            return res;
          }));
      }
      updateUserRollData(id, data) {
        return this._HTTP.put(environment.baseUrl8080 +'user-role/' + id, data)
          .pipe(map((res: any) => {
            return res;
          }));
      }


}
