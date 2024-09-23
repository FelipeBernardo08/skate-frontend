import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LocalService } from 'src/app/services/local.service';
import { SnackMessageService } from 'src/app/services/snack-message.service';
import { environment } from 'src/environments/environment';

interface imageLocal {
  caminho: SafeUrl,
  url: any
}
@Component({
  selector: 'app-update-spots',
  templateUrl: './update-spots.component.html',
  styleUrls: ['./update-spots.component.css']
})
export class UpdateSpotsComponent implements OnInit {

  constructor(
    private localService: LocalService,
    private sanitizer: DomSanitizer,
    private snackMessageService: SnackMessageService,
  ) { }

  @ViewChild('fileInput') fileInput!: ElementRef;

  loader: boolean = true;
  local: Array<any> = [];
  storageUrl: string = environment.BASE_URL_STORAGE;
  images: Array<any> = [];

  ngOnInit(): void {
    this.getLocals();
  }

  getLocals(): void {
    this.localService.readLocalBySkaterId(this.getIdUrl()).subscribe((resp: any) => {
      this.local = resp;
      setTimeout(() => {
        this.loader = false;
      }, 1000)
    })
  }

  getIdUrl(): string {
    let url: string = window.location.href;
    let lastSlash: number = url.lastIndexOf('/');
    return url.substring(lastSlash + 1);
  }

  countRows(coment: string): number {
    let result = coment.split('\n');
    if (result.length < 5) {
      return result.length;
    }
    return 5;
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

  deleteImage(id: number): void {
    this.localService.deleteImageLocal(id).subscribe((resp: any) => {
      this.snackMessageService.snackMessage('Imagem excluida com sucesso!');
      this.getLocals();
    })
  }
}
