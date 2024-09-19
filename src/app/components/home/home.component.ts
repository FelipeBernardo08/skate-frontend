import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { SnackMessageService } from 'src/app/services/snack-message.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private snackMessageService: SnackMessageService
  ) { }

  loader: boolean = true;

  storageUrl: string = environment.BASE_URL_STORAGE;

  buttonLikeDisabled: boolean = false;

  products: Array<any> = [];

  ngOnInit(): void {
    this.getProductsComplete();
  }

  getProductsComplete(): void {
    this.productService.getProducts().subscribe((resp: any) => {
      this.products = resp;
      this.insertPrincipalImageCard(resp)
      setTimeout(() => {
        this.loader = false;
      }, 1000)
    }, (error: any) => {
      setTimeout(() => {
        this.loader = false;
      }, 1000)
    })
  }

  getImageSkaterProfile(image: string): string {
    return `${this.storageUrl}/${image}`
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


  calculateRows(text: string): number {
    let result = text.split('\n');
    if (result.length + 3 < 7) {
      return result.length + 1;
    }
    return 7;
  }

  insertPrincipalImageCard(products: any): void {
    products.forEach((element: any, i: any) => {
      this.products[i].principalImage = element.image_product[0].file_name;
    });
  }

  sendLikeLocal(id: any, likes: Array<any>): void {
    if (sessionStorage.getItem('token') == null) {
      this.snackMessageService.snackMessage('Efetue o login para enviar sua curtida!');
    }
    if (!this.checkLikes(likes)) {
      this.buttonLikeDisabled = true;
      let payload = {
        id_local: id
      }
      this.productService.sendLike(payload).subscribe((resp: any) => {
        this.buttonLikeDisabled = false;
        this.getProductsComplete();
      }, (error: any) => {
        this.buttonLikeDisabled = false;
        this.snackMessageService.snackMessage('Erro no servidor, tente novamente mais tarde!');
      })
    } else {
      this.buttonLikeDisabled = true;
      this.productService.removeLike(id).subscribe((resp: any) => {
        this.buttonLikeDisabled = false;
        this.getProductsComplete();
      }, (error: any) => {
        this.buttonLikeDisabled = false;
      })
    }
  }

  checkLikes(likes: Array<any>): boolean {
    let id: string | null = sessionStorage.getItem('id_skater');
    let haveId: boolean = false;
    likes.forEach((element: any) => {
      if (element.fk_skater == id) {
        haveId = true;
      }
    });
    return haveId;
  }

  sendCallToSkater(fone: string, name: string, product: string): void {
    const mensagem: string = `Olá skatista ${name}. Vim do GhostSkate e tenho interesse em seu anúncio: ${product}`
    const mensagemTratada: string = mensagem.replace(/ /g, '%20');
    const url: string = `https://wa.me/55${fone}`;
    const urlFinal = `${url}?text=${mensagemTratada}`;
    window.open(urlFinal, '_blank');
  }
}
