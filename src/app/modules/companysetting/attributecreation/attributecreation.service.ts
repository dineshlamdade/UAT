import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SaveAttributeCreation} from './attributecreation.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class attributecreation {
  url = 'http://localhost:8084/hrms/v1/';

  constructor(private _HTTP: HttpClient) { }

  // get All AttributeCreation
  getAllAttributeCreation() {
    debugger
    return this._HTTP.get(this.url + 'payrollhead-attribute-master/global')
      .pipe(map((res: any) => {
        return res;
      }));
  }

    //get Attribute Creation By Id
    GetAttributeCreationById(id: number) {//: Observable<saveBusinessYear | {}> {
        debugger
        return this._HTTP.get(this.url + 'payrollhead-attribute-master/global/' + id)
          .pipe(map((res: any) => {
            return res;
          }));
      }

  //add new AttributeCreation
  AddAttributeCreation(data: SaveAttributeCreation): Observable<number | {}> {
    debugger
    return this._HTTP.post(this.url + 'payrollhead-attribute-master', data)
      .pipe(map((res: any) => {
        return res;
      }));
  }

}