import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RembClaimNontaxService {
  apiUrl = environment.baseUrl8089;

  constructor(private http: HttpClient) { }

  
  getHeadMasterFields(headId){
    return this.http.get(this.apiUrl + 'registration-template/head-master-id/' + headId )
    .pipe(map((response:any)=>{
      return response;
    }))
  }




  
}
