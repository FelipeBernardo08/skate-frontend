import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EstateAndCityApiService {

  constructor(
    private http: HttpClient
  ) { }

  baseUrl: string = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

  getEstate(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getCitiesByEstate(estate: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${estate}/distritos`);
  }
}
