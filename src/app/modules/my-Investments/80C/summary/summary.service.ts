import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, of, BehaviorSubject , throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  apiUrl = environment.apiBaseUrl;

  constructor(private _HTTP: HttpClient) { }

    //Summary services
    get80CSummary() {
      return this._HTTP.get(this.apiUrl + 'investmentSummary/80C')
      .pipe(map((res: any) => {
        return res;
      }));
    }

}

