import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Regystry } from 'src/app/interfaces/regystry';
import { LoginService } from 'src/app/services/login.service';
import { SnackMessageService } from 'src/app/services/snack-message.service';

@Component({
  selector: 'app-create-skater',
  templateUrl: './create-skater.component.html',
  styleUrls: ['./create-skater.component.css']
})
export class CreateSkaterComponent implements OnInit {

  constructor(
    private router: Router,
    private loginService: LoginService,
    private snackMessageService: SnackMessageService
  ) { }

  registry: Regystry = {
    email: '',
    password: '',
    name: '',
    passwordConfirm: ''
  };
  hide1: boolean = true;
  hide2: boolean = true;
  loader: boolean = false;

  ngOnInit(): void {
    let token = sessionStorage.getItem('token')
    if (token) {
      this.router.navigate(['/profile']);
    }
  }

  showPassword1(): void {
    this.hide1 = !this.hide1;
  }

  showPassword2(): void {
    this.hide2 = !this.hide2;
  }

  sendRegistry(): void {
    if (this.registry.name != '' && this.registry.email != '' && this.registry.password != '') {
      if (this.registry.password === this.registry.passwordConfirm) {
        this.loader = true;
        this.loginService.registry(this.registry).subscribe((resp: any) => {
          this.snackMessageService.snackMessage('Registro criado com sucesso! Um e-mail foi enviado para confirmação de conta');
          this.router.navigate(['/login']);
        }, (error: any) => {
          this.snackMessageService.snackMessage(error.error.Error);
          this.loader = false;
        })
      } else {
        this.snackMessageService.snackMessage('As senhas precisam ser idênticas!');
      }
    } else {
      this.snackMessageService.snackMessage('Preencha todos os campos!');
    }
  }

  login(): void {
    this.router.navigate(['/login']);
  }

}
