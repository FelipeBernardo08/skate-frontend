import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Regystry } from 'src/app/interfaces/regystry';

@Component({
  selector: 'app-create-skater',
  templateUrl: './create-skater.component.html',
  styleUrls: ['./create-skater.component.css']
})
export class CreateSkaterComponent implements OnInit {

  constructor(
    private router: Router
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
      console.log(this.registry);
    }
  }

  login(): void {
    this.router.navigate(['/login']);
  }

}
