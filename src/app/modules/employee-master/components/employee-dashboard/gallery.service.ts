import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  constructor(private http: HttpClient) { }

  getImages() {
  return this.http.get<any>('assets/showcase/data/photos.json')
    .toPromise()
    // .then(res => <Image[]>res.data)
    .then(data => { return data; });
  }
}
