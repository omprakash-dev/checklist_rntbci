import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs-compat'

@Injectable({
  providedIn: 'root'
})
export class AppTechStacksCheckListsService {

  url = 'http://localhost:3000/appTechStackCheckList/';

  constructor(private http: HttpClient) { }

  public getAppTechStacksCheckList(): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
    return this.http.get<any>(this.url, { headers: headers });
  }

  public getAppTechStacksCheckListById(id: string): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
    return this.http.get<any>(this.url + 'getAppTechStacksById/' + id, { headers: headers });
  }

  public addAppTechStacksCheckList(queryParam: any): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post<any>(this.url, queryParam, { headers: headers });
  }

  public UpdateAppTechStacksCheckList(queryParam: any, id: string): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.put<any>(this.url + id, queryParam, { headers: headers });
  }

}
