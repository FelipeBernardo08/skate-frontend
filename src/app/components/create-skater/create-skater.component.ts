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
        this.snackMessageService.snackMessage('error');
      })
    }
  }

  login(): void {
    this.router.navigate(['/login']);
  }

}
