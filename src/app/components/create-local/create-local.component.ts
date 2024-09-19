import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { element } from 'protractor';
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
      if (this.images.length < 5) {
        this.images.push(image)
      } else {
        this.snackMessageService.snackMessage('Máxima quantidade de imagens alcançada.')
      }
      e.target.value = null;
    }
  }

  removeImage(image: any): void {
    this.images = this.images.filter((img: any) => {
      return img.url !== image;
    });
  }

  createLocal(): void {
    if (this.images.length == 0) {
      this.snackMessageService.snackMessage('Selecione ao menos uma imagem!');
    } else {
      this.localService.createLocal(this.place).subscribe((resp: any) => {
        this.images.forEach((element: any) => {
          let formData = new FormData();
          formData.append('file_name', element.url)
          this.localService.createImageLocal(formData, resp.id).subscribe((resp: any) => {
            this.snackMessageService.snackMessage(resp.msg);
            this.router.navigate(['/']);
          })
        })
      })
    }
  }

  cancelCreateLocal(): void {
    this.router.navigate(['/include'])
  }
}