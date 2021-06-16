import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, of, BehaviorSubject , throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesNPS80CCD1Service {

  apiUrl = environment.baseUrl8085;

  constructor(private _HTTP: HttpClient) { }

   //Summary services
   getEmployeeNPSCCD1() {
    return this._HTTP.get(this.apiUrl + 'npsMaster-detail/nps80CCD1Summary')
    .pipe(map((res: any) => {
      return res;
    }));
  }
}
