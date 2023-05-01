import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataProvider {
  constructor(public http: HttpClient) {}

  getPeople(): Observable<{ people: any[] }> {
    return this.getData('people.json');
  }

  getProjects(): Observable<{ projects: any[] }> {
    return this.getData('projects.json');
  }

  private getData(fileName: string): any {
    return this.http.get(`/assets/data/${fileName}`);
  }
}
