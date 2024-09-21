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

  public createImageLocal(image: any, id: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-image-local/${id}`, image, { headers: this.getHeaders() });
  }

  public readLocals(): Observable<any> {
    return this.http.get(`${this.baseUrl}/read-locals`);
  }

  public sendLike(like: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-like-local`, like, { headers: this.getHeaders() });
  }

  public removeLike(likeId: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/remove-like-local/${likeId}`, { headers: this.getHeaders() });
  }

  public sendCommentToLocal(coment: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-comment-local`, coment, { headers: this.getHeaders() });
  }

  public readLocalBySkater(): Observable<any> {
    return this.http.get(`${this.baseUrl}/read-local-by-skater`, { headers: this.getHeaders() });
  }
}
