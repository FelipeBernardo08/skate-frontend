import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/interfaces/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router
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
      console.log(this.login)
    }
  }

  registry(): void {
    ; this.router.navigate(['/create-profile']);
  }
}
