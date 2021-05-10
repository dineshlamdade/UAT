import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class AffirmationService {
  public apiUrl = environment.baseUrl8085;
  constructor(private _HTTP: HttpClient) {}


  /*....................Master Summary............................... */
getaffirmationSummarySummary() {
  return this._HTTP
    .get(this.apiUrl + 'affirmationSummary')
    .pipe(
      map((res: any) => {
        return res;
      })
    );
}

}
