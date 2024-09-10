import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor(
    private http: HttpClient
  ) { }

  private baseUrl: string = environment.BASE_URL;

  private retornarToken(): string | null {
    return sessionStorage.getItem('token');
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.retornarToken()}`
    })
  }

  public createLocal(local: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-local`, local, { headers: this.getHeaders() });
  }

  public createImageLocal(image: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-image-local`, image, { headers: this.getHeaders() });
  }
}
