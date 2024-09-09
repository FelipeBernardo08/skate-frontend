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
      'Authorization': `Bearer ${this.retornarToken()}`
    })
  }

  public updateUser(user: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/update-skater`, user, { headers: this.getHeaders() });
  }

  public createImageProfile(image: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-image-profile`, image, { headers: this.getHeaders() });
  }

  public deleteImageProfile(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-image-profile/${id}`, { headers: this.getHeaders() });
  }
}
