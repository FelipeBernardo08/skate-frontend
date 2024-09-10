import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Local } from 'src/app/interfaces/local';
import { LocalService } from 'src/app/services/local.service';
import { SnackMessageService } from 'src/app/services/snack-message.service';

interface imageLocal {
  caminho: SafeUrl,
  url: any
}
@Component({
  selector: 'app-create-local',
  templateUrl: './create-local.component.html',
  styleUrls: ['./create-local.component.css']
})
export class CreateLocalComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private localService: LocalService,
    private snackMessageService: SnackMessageService
  ) { }

  loader: boolean = true;

  images: Array<any> = [];

  payloadSendImages: Array<FormData> = [];

  formDataImage: FormData = new FormData();

  place: Local = {
    title: '',
    description: '',
    access: true,
    address_street: '',
    address_number: '',
    address_neighborhood: '',
    address_city: '',
    address_estate: ''
  }


  ngOnInit(): void {
    setTimeout(() => {
      this.loader = !this.loader
    }, 1000)
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
      this.images.push(image)
      e.target.value = null;
    }
  }

  removeImage(image: any): void {
    this.images = this.images.filter((img: any) => {
      return img.url !== image;
    });
  }

  createLocal(): void {
    //adicionar logica para criar um array de formData com as imagens selecionadas
    if (this.payloadSendImages.length == 0) {
      this.snackMessageService.snackMessage('Selecione ao menos uma imagem!');
    } else {
      this.localService.createLocal(this.place).subscribe((resp: any) => {
        let payloadImages = {
          images: this.payloadSendImages,
          id_local: resp.id
        }
        this.localService.createImageLocal(payloadImages).subscribe((resp: any) => {
          console.log(resp);
        })
      })
    }
    this.payloadSendImages = [];
  }

  cancelCreateLocal(): void {
    this.router.navigate(['/include'])
  }
}