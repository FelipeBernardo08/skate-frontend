import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnackMessageService } from 'src/app/services/snack-message.service';

@Component({
  selector: 'app-include',
  templateUrl: './include.component.html',
  styleUrls: ['./include.component.css']
})
export class IncludeComponent implements OnInit {

  constructor(
    private router: Router,
    private snackMessageService: SnackMessageService
  ) { }

  loader: boolean = true;

  ngOnInit(): void {
    this.verifyUser();
    setTimeout(() => {
      this.loader = !this.loader
    }, 1000)
  }

  verifyUser(): void {
    let token = sessionStorage.getItem('token')
    if (token == undefined || token == 'udnefined' || token == null || token == '') {
      this.snackMessageService.snackMessage('Efetue o login primeiro!');
      this.router.navigate(['/login'])
    }
  }

  openCreateLocal(): void {

  }
}
