import { Component, OnInit } from '@angular/core';
import { LocalService } from 'src/app/services/local.service';
import { SnackMessageService } from 'src/app/services/snack-message.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.css']
})
export class LocalComponent implements OnInit {

  constructor(
    private localService: LocalService,
    private snackMessageService: SnackMessageService
  ) { }

  loader: boolean = true;

  local: Array<any> = [];

  storageUrl: string = environment.BASE_URL_STORAGE;

  imageUrl: string = '';

  ngOnInit(): void {
    this.getLocalsComplete();
  }

  getLocalsComplete(): void {
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

  sendLikeLocal(id: any): void {
    if (sessionStorage.getItem('token') == null) {
      this.snackMessageService.snackMessage('Efetue o login para enviar sua curtida!');
    } else {
      let payload = {
        id_local: id
      }
      this.localService.sendLike(payload).subscribe((resp: any) => {
        this.getLocalsComplete();
      }, error => {
        this.snackMessageService.snackMessage('Erro no servidor, tente novamente mais tarde!');
      })
    }
  }

  getImageSkaterProfile(image: string): string {
    return `${this.storageUrl}/${image}`
  }

  convertTime(time: string): string {
    let date = new Date(time)
    const brasiliaOffset = -3 * 60 * 60 * 1000;
    const localDate = new Date(date.getTime() + brasiliaOffset);
    const day = localDate.getUTCDate().toString().padStart(2, '0');
    const month = (localDate.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = localDate.getUTCFullYear();
    const hours = localDate.getUTCHours().toString().padStart(2, '0');
    const minutes = localDate.getUTCMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  }

  checkLikes(likes: Array<any>): string {
    let id: string | null = sessionStorage.getItem('id_skater');
    let haveId: boolean = false;
    likes.forEach((element: any) => {
      if (element.fk_skater == id) {
        haveId = true;
      }
    });
    if (haveId == false) {
      return 'btn btn-sm btn-outline-primary w-100 text-center'
    }
    return 'btn btn-sm btn-outline-primary w-100 text-center selected'
  }

  calculateRows(text: string): number {
    let result = text.split('\n');
    if (result.length + 3 < 7) {
      return result.length + 3;
    }
    return 7;
  }
}
