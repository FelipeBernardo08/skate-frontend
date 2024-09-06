import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

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

  public registry(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-skater`, credentials);
  }

  public login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  public me(): Observable<any> {
    return this.http.post(`${this.baseUrl}/me`, '', { headers: this.getHeaders() });
  }

  public changePassword(password: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/update-password`, password, { headers: this.getHeaders() });
  }

}
