import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataProvider {
  constructor(public http: HttpClient, @Inject(LOCALE_ID) public locale: string) {
    console.log(locale)
  }

  getPeople(): Observable<{ people: any[] }> {
    return this.getData('people.json');
  }

  getProjects(): Observable<{ projects: any[] }> {
    return this.getData('projects.json');
  }

  getAlbums(): Observable<any[]> {
    return this.getData('top-500-albums.json');
  }

  private getData(fileName: string): any {
    return this.http.get(`assets/data/${fileName}`);
  }
}
