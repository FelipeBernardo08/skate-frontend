import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { ProductService } from 'src/app/services/product.service';
import { SnackMessageService } from 'src/app/services/snack-message.service';
import { environment } from 'src/environments/environment';

interface imageLocal {
  caminho: SafeUrl,
  url: any
}
@Component({
  selector: 'app-update-products',
  templateUrl: './update-products.component.html',
  styleUrls: ['./update-products.component.css']
})
export class UpdateProductsComponent implements OnInit {

  constructor(
    private router: Router,
    private snackMessageService: SnackMessageService,
    private sanitizer: DomSanitizer,
    private productService: ProductService
  ) { }

  @ViewChild('fileInput') fileInput!: ElementRef;

  loader: boolean = true;
  product: Array<any> = [];
  typeProducts: Array<any> = [];
  subtype: Array<any> = [];
  storageUrl: string = environment.BASE_URL_STORAGE;
  images: Array<any> = [];

  ngOnInit(): void {
    if (!this.checkToken()) {
      this.snackMessageService.snackMessage('Efetue o login primeiro!');
      this.router.navigate(['/login'])
    } else {
      this.getProductId();
    }
  }

  getProductId(): void {
    this.productService.readProductId(this.getIdUrl()).subscribe((resp: any) => {
      this.product = resp;
      console.log(this.product)
      this.getTypeProducts();
      this.getSubType(this.product[0].type.name);
      console.log(resp);
    }, error => {
      this.loader = false;
    })
  }

  getTypeProducts(): void {
    this.productService.getTypeProduct().subscribe((resp: any) => {
      this.typeProducts = resp;
      setTimeout(() => {
        this.loader = !this.loader;
      }, 1000);
    })
  }

  getIdUrl(): string {
    let url: string = window.location.href;
    let lastSlash: number = url.lastIndexOf('/');
    return url.substring(lastSlash + 1);
  }

  deleteImage(id: number): void {
    this.productService.deleteImageProduct(id).subscribe((resp: any) => {
      this.snackMessageService.snackMessage('Imagem excluida com sucesso!');
      this.getProductId();
    })
  }

  removeImage(image: any): void {
    this.images = this.images.filter((img: any) => {
      return img.url !== image;
    });
  }

  triggerImage(): void {
    this.fileInput.nativeElement.click();
  }

  selectImage(e: any): void {
    const file = e.target.files[0];
    if (file) {
      let image: imageLocal = {
        caminho: this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file)),
        url: file
      }
      if ((this.product[0].image_product.length + this.images.length) < 5) {
        this.images.push(image)
      } else {
        this.snackMessageService.snackMessage('Máxima quantidade de imagens alcançada.')
      }
      e.target.value = null;
    }
  }
  checkToken(): boolean {
    return sessionStorage.getItem('token') != null;
  }

  getSubType(value: string): void {
    this.productService.getSubTypeProduct(value).subscribe((resp: any) => {
      this.subtype = resp;
    })
  }

  setProductDisabled(id: number): void {
    if (this.product[0].active == true) {
      this.productService.disableProduct(id).subscribe((resp: any) => {
        this.snackMessageService.snackMessage('Registro desativado com sucesso!');
      })
    } else {
      this.productService.enableProduct(id).subscribe((resp: any) => {
        this.snackMessageService.snackMessage('Registro ativado com sucesso!');
      })
    }
  }

  saveUpdateProduct(): void {
    this.productService.updateProduct(this.getIdUrl(), this.product[0]).subscribe((resp: any) => {
      console.log(resp);
    })
    if (this.images.length != 0) {
      this.images.forEach((element: any) => {
        let formData = new FormData();
        formData.append('file_name', element.url)
        this.productService.createImageProduct(formData, this.getIdUrl()).subscribe((resp: any) => {
        })
      })
    }
    this.snackMessageService.snackMessage('Registro atualizado com sucesso!');
  }
}
