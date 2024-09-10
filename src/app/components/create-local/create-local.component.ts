import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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
  ) { }

  loader: boolean = true;

  images: Array<any> = [];

  payloadSendImages: Array<FormData> = [];


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

}
