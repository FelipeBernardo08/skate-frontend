import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { SnackMessageService } from 'src/app/services/snack-message.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent implements OnInit {

  constructor(
    private productsService: ProductService,
    private router: Router,
    private snackMessageService: SnackMessageService
  ) { }

  loader: boolean = true;
  products: Array<any> = [];
  storageUrl: string = environment.BASE_URL_STORAGE;

  ngOnInit(): void {
    if (!this.checkToken()) {
      this.snackMessageService.snackMessage('Efetue o login primeiro!');
      this.router.navigate(['/login'])
    } else {
      this.radMyProducts();
    }
  }

  radMyProducts(): void {
    this.productsService.readOwnProducts().subscribe((resp: any) => {
      this.products = resp;
      this.loader = false;
    }, (error: any) => {
      this.loader = false;
    })
  }

  calculateRows(text: string): number {
    let result = text.split('\n');
    if (result.length < 7) {
      return result.length;
    }
    return 7;
  }


  convertTime(time: string): string {
    let date = new Date(time)
    const brasiliaOffset = -3 * 60 * 60 * 1000;
    const localDate = new Date(date.getTime() + brasiliaOffset);
    const day = localDate.getUTCDate().toString().padStart(2, '0');
    const month = (localDate.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = localDate.getUTCFullYear();
    return `${day}/${month}/${year}`;
  }

  openUpdateProduct(id: number): void {
    this.router.navigate([`/update-products/${id}`]);
  }

  checkToken(): boolean {
    return sessionStorage.getItem('token') != null;
  }
}
