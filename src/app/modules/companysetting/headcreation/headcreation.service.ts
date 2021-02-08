import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SaveHeadCreation} from './headcreation.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class headcreation {
  // url = 'http://localhost:8084/hrms/v1/';
  public url = environment.baseUrl8084;

  constructor(private _HTTP: HttpClient) { }

  // get All HeadCreation
  getAllHeadCreation() {
    debugger
    return this._HTTP.get(this.url + 'payrollhead-master/global')
      .pipe(map((res: any) => {
        return res;
      }));
  }

    //get HeadCreationById
    GetHeadCreationById(id: number) {//: Observable<saveBusinessYear | {}> {
        debugger
        return this._HTTP.get(this.url + 'payrollhead-master/global/' + id)
          .pipe(map((res: any) => {
            return res;
          }));
      }

  //add new BusinessYear
  AddHeadCreation(data: SaveHeadCreation): Observable<number | {}> {
    debugger
    return this._HTTP.post(this.url + 'payrollhead-master', data)
      .pipe(map((res: any) => {
        return res;
      }));
  }

}
