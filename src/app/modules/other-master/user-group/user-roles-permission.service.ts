
import { Injectable } from '@angular/core';

import { environment } from './../../../../environments/environment';
import { AuthService } from '../../auth/auth.service';

import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';



const headers = new Headers( {
  "Content-Type": "application/json",
  // "X-Authorization": "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIzIiwiVXNlckRldGFpbHMiOnsiZ3JvdXBOYW1lIjoiUGF5c3F1YXJlRGVmYXVsdCIsImNvbXBhbnlJZCI6MSwiY29tcGFueU5hbWUiOiJXaGl0ZUhlZGdlIiwiZW1haWxJZCI6InByZWV0aS5ndXB0YUBwYXlzcXVhcmUuY29tIiwidXNlck5hbWUiOiJQcmVldGlHIiwiZW1wbG95ZWVNYXN0ZXJJZCI6MTF9LCJpc3MiOiJodHRwOi8vcGF5c3F1YXJlLmNvbSIsImV4cCI6MTYxNTM4MDQ3OCwiaWF0IjoxNjE1Mzc4Njc4LCJqdGkiOiI3MjZjZmY1Ni05NjZkLTRmODAtOWExYS01ODE1ZjFkODAxNzAifQ.r-8Ak29YAuYfuM9SDXLeq3Lckq0fGnjiLQG2sC_aw8zEO16yVIBANMpG-TcMDEDyUP43Tb9rI_p3UjelEsOzv-GQRjVKPFl1uhZhObquRNdYM8vWcjejfZu8RiqITfHqnrQirVUp2gaNDYflv9KgAdOwummV-6-gK7GQFdldMoNvs4cWWVrXFHhwBmb9HhpUkepeHDb9wgoAZAsnibYl77DWI8BqQXQRUZQoYONQYrELClgv0IkGk88___Qb5KAKBtTcvUIFFIwmWqbKG8Ldn3fcaPGnQ9IqLniAErw_aa_Rxy95i8fA7DqYt140lWYh2hyDRg4-QQ0WeSpD_65hZQ"
} );


@Injectable( {
  providedIn: 'root'
} )
export class UserRolesPermissionService {



  constructor( private _HTTP: HttpClient, private authservice: AuthService ) { }

  getByCompanyGroupMaster() {

    // alert()
    //  let token = this.authservice.getJwtToken()
    //  let token = "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIzIiwiVXNlckRldGFpbHMiOnsiZ3JvdXBOYW1lIjoiUGF5c3F1YXJlRGVmYXVsdCIsImNvbXBhbnlJZCI6MSwiY29tcGFueU5hbWUiOiJXaGl0ZUhlZGdlIiwiZW1haWxJZCI6InByZWV0aS5ndXB0YUBwYXlzcXVhcmUuY29tIiwidXNlck5hbWUiOiJQcmVldGlHIiwiZW1wbG95ZWVNYXN0ZXJJZCI6MTF9LCJpc3MiOiJodHRwOi8vcGF5c3F1YXJlLmNvbSIsImV4cCI6MTYxNTc5MTI1NCwiaWF0IjoxNjE1Nzg5NDU0LCJqdGkiOiI4Y2VmYTVkOS05NWM1LTRmZTMtODRhOC1iMWRiM2RkODFkYjYifQ.EeBofzbdUQ4MxwRayPx549x7osBN9HvDdoJrBO9X43kQnOQE3qUgXUDOB_QtjV_7ESUWb5K89s-HV3BlZ93JvwaN9GuR9qIDbwf3vvyuKGG5gyuQ2JLSD9Fm0BLjsMtjdmp89MNYQ1_U6xWj6UX3hoNUnhv1MSDvrEQJYFHVQngCYIGEFXIfRfkjGMCnqf4jQEiT-VXOKDp_CbIqvo8DnCzgzgVQGZBfGkho93nUTRMA2jTVaxfwnj-xVOkq32ng5C7mbg1Ztu7bm5VcFyLID7XGCcesDNLQBg3pbmDch93NfBXn2rwSWV9OB235mIDTsff4J1Ne3_O8ChTa7x1dFA"
    //  console.log(token);
    // const headers = new HttpHeaders()
    //   .set('content-type', 'application/json')
    //   .set('Access-Control-Allow-Origin', '*')
    // .set('X-Authorization', token);

    return this._HTTP.get( environment.baseUrl8080 + 'user-role/getBycompanyGroupMasterId/12' )
      .pipe( map( ( res: any ) => {
        console.log( res );

        return res;
      } ) );
  }

  getUserGroupForRoleGroup() {
    let token = this.authservice.getJwtToken()
    const headers = new HttpHeaders()
      .set( 'content-type', 'application/json' )
      .set( 'Access-Control-Allow-Origin', '*' )
      .set( 'X-Authorization', token );

    console.log( headers )
    return this._HTTP.get( environment.baseUrl8080 + 'user-group/getByCompanyGroupId/12', { headers: headers } )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  postUserRollData( data ) {
    return this._HTTP.post( environment.baseUrl8080 + 'user-role', data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }
  updateUserRollData( id, data ) {
    return this._HTTP.put( environment.baseUrl8080 + 'user-role/' + id, data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }
  //--------------start user group API-----------------------------
  //--------------G user group API-----------------------------

  getAllUserGroupData() {
    let token = this.authservice.getJwtToken()
    //  let token = "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIzIiwiVXNlckRldGFpbHMiOnsiZ3JvdXBOYW1lIjoiUGF5c3F1YXJlRGVmYXVsdCIsImNvbXBhbnlJZCI6MSwiY29tcGFueU5hbWUiOiJXaGl0ZUhlZGdlIiwiZW1haWxJZCI6InByZWV0aS5ndXB0YUBwYXlzcXVhcmUuY29tIiwidXNlck5hbWUiOiJQcmVldGlHIiwiZW1wbG95ZWVNYXN0ZXJJZCI6MTF9LCJpc3MiOiJodHRwOi8vcGF5c3F1YXJlLmNvbSIsImV4cCI6MTYxNTc5MTI1NCwiaWF0IjoxNjE1Nzg5NDU0LCJqdGkiOiI4Y2VmYTVkOS05NWM1LTRmZTMtODRhOC1iMWRiM2RkODFkYjYifQ.EeBofzbdUQ4MxwRayPx549x7osBN9HvDdoJrBO9X43kQnOQE3qUgXUDOB_QtjV_7ESUWb5K89s-HV3BlZ93JvwaN9GuR9qIDbwf3vvyuKGG5gyuQ2JLSD9Fm0BLjsMtjdmp89MNYQ1_U6xWj6UX3hoNUnhv1MSDvrEQJYFHVQngCYIGEFXIfRfkjGMCnqf4jQEiT-VXOKDp_CbIqvo8DnCzgzgVQGZBfGkho93nUTRMA2jTVaxfwnj-xVOkq32ng5C7mbg1Ztu7bm5VcFyLID7XGCcesDNLQBg3pbmDch93NfBXn2rwSWV9OB235mIDTsff4J1Ne3_O8ChTa7x1dFA"
    // console.log(token);
    // const headers = new HttpHeaders()
    //   .set('content-type', 'application/json')
    //   .set('Access-Control-Allow-Origin', '*')
    //   .set('X-Authorization', token);

    const headers = new HttpHeaders( {
      'Content-Type': 'application/json',
      // 'X-Authorization': token,

    } );

    console.log( headers )
    return this._HTTP.get<any>( environment.baseUrl8080 + 'user-group/getByCompanyGroupId/12', { headers: { 'Content-Type': 'application/json', 'X-Authorization': token } } )
    // .pipe(map((res: any) => {
    //   return res;
    // }));
  }

  //----------------user-group/getAllUserGroupsByCompanyGroups---------------

  postUserGroupGetAllUserGroupsByCompanyGroups( data ) {
    return this._HTTP.post( environment.baseUrl8080 + 'user-group/getAllUserGroupsByCompanyGroups', data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }


  //----------------Post---user-group--Add-- update---------------

  postUserGroupData( data ) {
    return this._HTTP.post( environment.baseUrl8080 + 'user-group', data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  //----------------Post---user-group/getAllDistinctByCompanyGroups---------------

  postUserroupGetAllDistinctByCompanyGroups( data ) {
    return this._HTTP.post( environment.baseUrl8080 + 'user-group/getAllDistinctByCompanyGroups', data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  //----------------Post---Assign/UnAssign company group list---------------

  postUserGroupGetAllCompanyGroupsByUserGroup( data ) {
    return this._HTTP.post( environment.baseUrl8080 + 'user-group/getAllCompanyGroupsByUserGroup', data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  //----------------Post---get Assigned Company GroupsByUserGroupName for pop up---------------

  postUserGroupGetAssignedCompanyGroupsByUserGroupName( data ) {
    return this._HTTP.post( environment.baseUrl8080 + 'user-group/getAssignedCompanyGroupsByUserGroupName', data )
      .pipe( map( ( res: any ) => {
        return res;
      } ) );
  }

  // getJwtToken() {
  //   return sessionStorage.getItem(this.JWT_TOKEN);
  // }

  // getprivileges() {
  //   return jwt_decode(sessionStorage.getItem(this.JWT_TOKEN));
  // }

}
