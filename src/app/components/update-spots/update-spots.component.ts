import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EstateAndCityApiService } from 'src/app/services/estate-and-city-api.service';
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
    private router: Router,
    private estateAndCityApiService: EstateAndCityApiService
  ) { }

  @ViewChild('fileInput') fileInput!: ElementRef;

  loader: boolean = true;
  local: Array<any> = [];
  storageUrl: string = environment.BASE_URL_STORAGE;
  images: Array<any> = [];
  estates: Array<any> = [];
  cities: Array<any> = [];

  ngOnInit(): void {
    if (!this.checkToken()) {
      this.snackMessageService.snackMessage('Efetue o login primeiro!');
      this.router.navigate(['/login'])
    } else {
      this.getLocals();
      this.getEstates();
    }
  }

  getLocals(): void {
    this.localService.readLocalBySkaterId(this.getIdUrl()).subscribe((resp: any) => {
      this.local = resp;
      this.changeCities(this.local[0].address_estate);
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
      if ((this.local[0].images.length + this.images.length) < 5) {
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

  removeImage(image: any): void {
    this.images = this.images.filter((img: any) => {
      return img.url !== image;
    });
  }

  saveUpdateLocal(): void {
    this.localService.updateLocal(this.getIdUrl(), this.local[0]).subscribe((resp: any) => {

    })
    if (this.images.length != 0) {
      this.images.forEach((element: any) => {
        let formData = new FormData();
        formData.append('file_name', element.url)
        this.localService.createImageLocal(formData, this.getIdUrl()).subscribe((resp: any) => {
        })
      })
    }
    this.snackMessageService.snackMessage('Registro atualizado com sucesso!');
  }

  cancelUpdateLocal(): void {
    this.router.navigate(['/read-my-spots']);
  }

  checkToken(): boolean {
    return sessionStorage.getItem('token') != null;
  }

  getEstates(): void {
    this.estateAndCityApiService.getEstate().subscribe((resp: any) => {
      this.estates = resp;
    })
  }

  changeCities(estate: string): void {
    this.estateAndCityApiService.getCitiesByEstate(estate).subscribe((resp: any) => {
      this.cities = resp;
    })
  }
}
