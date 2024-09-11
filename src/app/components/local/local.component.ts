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

  ngOnInit(): void {
    this.localService.readLocals().subscribe((resp: any) => {
      console.log(resp)
      setTimeout(() => {
        this.local = resp
        this.insertPrincipalImageCard(this.local)
        this.loader = false;
      }, 1000);
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

  calculateRows(text: string): number {
    let result = text.split('\n');
    return result.length + 1;
  }
}
