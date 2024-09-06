import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SkaterService {

  constructor(
    private http: HttpClient
  ) { }

  private baseUrl: string = environment.BASE_URL;

  private retornarToken(): string | null {
    return sessionStorage.getItem('token');
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.retornarToken()}`
    })
  }

  public updateUser(user: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/update-skater`, user, { headers: this.getHeaders() });
  }
}
