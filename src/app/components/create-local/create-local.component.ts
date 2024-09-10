import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Local } from 'src/app/interfaces/local';

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
    private router: Router
  ) { }

  loader: boolean = true;

  images: Array<any> = [];

  payloadSendImages: Array<FormData> = [];

  place: Local = {
    title: '',
    description: '',
    access: '',
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
      let formData: FormData = new FormData();
      formData.append('file_name', file);
      this.payloadSendImages.push(formData);
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

  }

  cancelCreateLocal(): void {
    this.router.navigate(['/include'])
  }
}
