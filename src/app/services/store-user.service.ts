import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class StoreUserService {

  constructor(
    private loginService: LoginService
  ) { }

  public storeUser(): void {
    this.loginService.me().subscribe((resp: any) => {
      resp[0].name ? sessionStorage.setItem('name', resp[0].name) : ''
      resp[0].skater[0].fone ? sessionStorage.setItem('fone', resp[0].skater[0].fone) : ''
      resp[0].skater[0].cpf ? sessionStorage.setItem('cpf', resp[0].skater[0].cpf) : ''
      resp[0].skater[0].address_neighborhood ? sessionStorage.setItem('address_neighborhood', resp[0].skater[0].address_neighborhood) : ''
      resp[0].skater[0].address_city ? sessionStorage.setItem('address_city', resp[0].skater[0].address_city) : ''
      resp[0].skater[0].urlImage ? sessionStorage.setItem('address_city', resp[0].skater[0].urlImage) : ''
    })
  }
}
