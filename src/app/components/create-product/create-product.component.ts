import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SnackMessageService } from 'src/app/services/snack-message.service';

interface imageLocal {
  caminho: SafeUrl,
  url: any
}
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  constructor(
    private productsService: ProductService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private snackMessageService: SnackMessageService
  ) { }

  @ViewChild('fileInput') fileInput!: ElementRef;


  loader: boolean = true;

  product: any = {
    description: '',
    active: '',
    brand: '',
    size: '',
    announcement_type: '',
    fk_type_product: '',
    fk_subtype_product: ''
  }

  typeProducts: Array<any> = [];

  subtype: Array<any> = [];

  images: Array<any> = [];

  ngOnInit(): void {
    this.getTypeProducts();
  }

  getTypeProducts(): void {
    this.productsService.getTypeProduct().subscribe((resp: any) => {
      this.typeProducts = resp;
      setTimeout(() => {
        this.loader = !this.loader;
      }, 1000);
    })
  }

  getSubType(value: string): void {
    this.productsService.getSubTypeProduct(value).subscribe((resp: any) => {
      this.subtype = resp;
    })
  }

  cancelCreateProduct(): void {
    this.router.navigate(['/include']);
  }

  createProduct(): void {
    if (this.images.length == 0) {
      this.snackMessageService.snackMessage('Selecione ao menos uma imagem!');
    } else {
      this.productsService.createProduct(this.product).subscribe((resp: any) => {
        this.images.forEach((element: any) => {
          let formData = new FormData();
          formData.append('file_name', element.url)
          this.productsService.createImageProduct(formData, resp.id).subscribe((resp: any) => {
            this.snackMessageService.snackMessage(resp.msg);
            this.router.navigate(['/product']);
          })
        })
      })
    }
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
      if (this.images.length < 5) {
        this.images.push(image)
      } else {
        this.snackMessageService.snackMessage('Máxima quantidade de imagens alcançada.')
      }
      e.target.value = null;
    }
  }
}
