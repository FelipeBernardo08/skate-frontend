import { Component, OnInit } from '@angular/core';
import { LocalService } from 'src/app/services/local.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.css']
})
export class LocalComponent implements OnInit {

  constructor(
    private localService: LocalService
  ) { }

  loader: boolean = true;

  local: Array<any> = [];

  storageUrl: string = environment.BASE_URL_STORAGE;

  imageUrl: string = '';

  ngOnInit(): void {
    this.localService.readLocals().subscribe((resp: any) => {
      setTimeout(() => {
        this.local = resp
        this.insertPrincipalImageCard(this.local)
        this.imageUrl = this.storageUrl + '/' + this.local[0].principalImage
        this.loader = false;
      }, 1000);
    }, error => {
      this.loader = false;
    })
  }

  insertPrincipalImageCard(locals: any): void {
    locals.forEach((element: any, i: any) => {
      this.local[i].principalImage = element.images[0].file_name;
    });
  }

  changeImage(indexCard: number, indexImage: number, id: string): any {
    this.local[indexCard].principalImage = this.local[indexCard].images[indexImage].file_name;
  }

  changeImageAuto(): void {

  }

  getImageSkaterProfile(image: string): string {
    return `${this.storageUrl}/${image}`
  }

  convertTime(time: string): string {
    let date = new Date(time)
    const brasiliaOffset = -3 * 60 * 60 * 1000;
    const localDate = new Date(date.getTime() + brasiliaOffset);
    const day = localDate.getUTCDate().toString().padStart(2, '0');
    const month = (localDate.getUTCMonth() + 1).toString().padStart(2, '0'); // Meses começam do zero
    const year = localDate.getUTCFullYear();
    const hours = localDate.getUTCHours().toString().padStart(2, '0');
    const minutes = localDate.getUTCMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  }

  calculateRows(text: string): number {
    let result = text.split('\n');
    return result.length + 1;
  }
}
