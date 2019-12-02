import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs-compat'

@Injectable({
  providedIn: 'root'
})
export class TechCheckListService {

  url = 'http://localhost:3000/techStack/';

  constructor(private http: HttpClient) { }

  public getTechCheckList(): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
    return this.http.get<any>(this.url, { headers: headers });
  }

  public getTechCheckListById(id: string): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
    return this.http.get<any>(this.url + 'getCheckListById/' + id, { headers: headers });
  }

  public addTechCheckList(queryParam: any): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post<any>(this.url, queryParam, { headers: headers });
  }

  public updateTechCheckList(queryParam: any, id: string): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.put<any>(this.url + id, queryParam, { headers: headers });
  }

  public deleteTechCheckList(id: string, cid: string, type: string): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.delete<any>(this.url + type + '/' + id + '/' + cid, { headers: headers });
  }

}
