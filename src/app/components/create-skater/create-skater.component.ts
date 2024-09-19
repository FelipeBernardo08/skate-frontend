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
    name: ''
  };
  hide: boolean = true;


  ngOnInit(): void {
    let token = sessionStorage.getItem('token')
    if (token) {
      this.router.navigate(['/profile']);
    }
  }

  showPassword(): void {
    this.hide = !this.hide;
  }

  sendRegistry(): void {
    if (this.registry.name != '' && this.registry.email != '' && this.registry.password != '') {
      this.loginService.registry(this.registry).subscribe((resp: any) => {
        this.snackMessageService.snackMessage('Registro criado com sucesso!');
        this.router.navigate(['/login']);
      }, error => {
        this.snackMessageService.snackMessage('Erro de conexão, tente novamente mais tarde!');
        if (error.status == 0) {
          this.snackMessageService.snackMessage('Erro de conexão, tente novamente mais tarde!');
        } else if (error.status == 404) {
          this.snackMessageService.snackMessage('E-mail já cadastrado, recupere a senha ou use outro e-mail.');
        }
      })
    }
  }

  login(): void {
    this.router.navigate(['/login']);
  }

}
