import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { Local } from 'src/app/interfaces/local';
import { EstateAndCityApiService } from 'src/app/services/estate-and-city-api.service';
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
    private snackMessageService: SnackMessageService,
    private estateAndCityApiService: EstateAndCityApiService
  ) { }

  loader: boolean = true;

  images: Array<any> = [];

  payloadSendImages: Array<FormData> = [];

  estates: Array<any> = [];

  cities: Array<any> = [];

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
    this.getEstates();
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
    this.loader = true;
    if (this.images.length == 0) {
      this.loader = false;
      this.snackMessageService.snackMessage('Selecione ao menos uma imagem!');
    } else {
      this.localService.createLocal(this.place).subscribe((resp: any) => {
        this.images.forEach((element: any) => {
          let formData = new FormData();
          formData.append('file_name', element.url)
          this.localService.createImageLocal(formData, resp.id).subscribe((resp: any) => {
          })
        })
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2500)
      })
    }
  }

  cancelCreateLocal(): void {
    this.router.navigate(['/include'])
  }

  getEstates(): void {
    this.estateAndCityApiService.getEstate().subscribe((resp: any) => {
      this.estates = resp;
      this.estates.sort((a, b) => {
        if (a.nome < b.nome) return -1;
        if (a.nome > b.nome) return 1;
        return 0;
      });
    })
  }

  changeCities(estate: string): void {
    this.estateAndCityApiService.getCitiesByEstate(estate).subscribe((resp: any) => {
      this.cities = resp;
      this.cities.sort((a, b) => {
        if (a.nome < b.nome) return -1;
        if (a.nome > b.nome) return 1;
        return 0;
      });
    })
  }
}