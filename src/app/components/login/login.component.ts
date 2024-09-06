import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/interfaces/login';
import { LoginService } from 'src/app/services/login.service';
import { SnackMessageService } from 'src/app/services/snack-message.service';
import { StoreUserService } from 'src/app/services/store-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private loginService: LoginService,
    private snackMessageService: SnackMessageService,
    private storeUser: StoreUserService
  ) { }

  login: Login = {
    email: '',
    password: ''
  };
  hide: boolean = true;

  ngOnInit(): void {
  }

  showPassword(): void {
    this.hide = !this.hide;
  }

  logIn(): void {
    if (this.login.email != '' && this.login.password != '') {
      this.loginService.login(this.login).subscribe((resp: any) => {
        sessionStorage.setItem('token', resp);
        this.storeUser.storeUser();
        this.router.navigate(['/profile']);
        this.snackMessageService.snackMessage('Sucesso!');
      })
    }
  }

  registry(): void {
    this.router.navigate(['/create-profile']);
  }
}
