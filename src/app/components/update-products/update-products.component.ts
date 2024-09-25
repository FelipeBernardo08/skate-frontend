import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnackMessageService } from 'src/app/services/snack-message.service';

@Component({
  selector: 'app-update-products',
  templateUrl: './update-products.component.html',
  styleUrls: ['./update-products.component.css']
})
export class UpdateProductsComponent implements OnInit {

  constructor(
    private router: Router,
    private snackMessageService: SnackMessageService
  ) { }

  ngOnInit(): void {
    if (!this.checkToken()) {
      this.snackMessageService.snackMessage('Efetue o login primeiro!');
      this.router.navigate(['/login'])
    }
  }

  checkToken(): boolean {
    return sessionStorage.getItem('token') != null;
  }
}
