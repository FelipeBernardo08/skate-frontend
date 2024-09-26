import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

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

  public getTypeProduct(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get-type-products`, { headers: this.getHeaders() });
  }

  public getSubTypeProduct(subtype: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/get-subtype-products/${subtype}`, { headers: this.getHeaders() });
  }

  public createImageProduct(image: any, id: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-image-product/${id}`, image, { headers: this.getHeaders() });
  }

  public createProduct(product: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-product`, product, { headers: this.getHeaders() });
  }

  public getProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/read-products`, { headers: this.getHeaders() });
  }

  public sendLike(like: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-like-product`, like, { headers: this.getHeaders() });
  }

  public removeLike(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/remove-like-product/${id}`, { headers: this.getHeaders() });
  }
}
