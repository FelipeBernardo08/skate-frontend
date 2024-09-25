import { Component, OnInit } from '@angular/core';
import { LocalService } from 'src/app/services/local.service';
import { SnackMessageService } from 'src/app/services/snack-message.service';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { DialgoCommentsComponent } from '../dialgo-comments/dialgo-comments.component';
import { EventCommentService } from 'src/app/services/event-comment.service';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.css']
})
export class LocalComponent implements OnInit {

  constructor(
    private localService: LocalService,
    private snackMessageService: SnackMessageService,
    public dialog: MatDialog,
    private eventCommentService: EventCommentService
  ) { }

  loader: boolean = true;

  buttonLikeDisabled: boolean = false;

  local: Array<any> = [];

  storageUrl: string = environment.BASE_URL_STORAGE;

  imageUrl: string = '';

  ngOnInit(): void {
    this.eventCommentService.eventEmitter.subscribe((id: any) => {
      this.localService.readLocals().subscribe((resp: any) => {
        this.local = resp
        this.insertPrincipalImageCard(this.local)
        this.imageUrl = this.storageUrl + '/' + this.local[0].principalImage
        let resultArray = this.local.filter((locals: any) => locals.id == id);
        this.openComments(resultArray[0].coments, id)
        setTimeout(() => {
          this.loader = false;
        }, 1000)
      }, error => {
        setTimeout(() => {
          this.loader = false;
        }, 1000)
      })
    })
    this.getLocalsComplete();
  }

  getLocalsComplete(): void {
    this.localService.readLocals().subscribe((resp: any) => {
      this.local = resp
      this.insertPrincipalImageCard(this.local)
      this.imageUrl = this.storageUrl + '/' + this.local[0].principalImage
      setTimeout(() => {
        this.loader = false;
      }, 1000)
    }, error => {
      setTimeout(() => {
        this.loader = false;
      }, 1000)
    })
  }

  insertPrincipalImageCard(locals: any): void {
    locals.forEach((element: any, i: any) => {
      if (element.images && element.images.length != 0) {
        this.local[i].principalImage = element.images[0].file_name;
      }
    });
  }

  sendLikeLocal(id: any, likes: Array<any>): void {
    if (sessionStorage.getItem('token') == null) {
      this.snackMessageService.snackMessage('Efetue o login para enviar sua curtida!');
    }
    if (!this.checkLikes(likes)) {
      this.buttonLikeDisabled = true;
      let payload = {
        id_local: id
      }
      this.localService.sendLike(payload).subscribe((resp: any) => {
        this.buttonLikeDisabled = false;
        this.getLocalsComplete();
      }, error => {
        this.buttonLikeDisabled = false;
        this.snackMessageService.snackMessage('Erro no servidor, tente novamente mais tarde!');
      })
    } else {
      this.buttonLikeDisabled = true;
      this.localService.removeLike(id).subscribe((resp: any) => {
        this.buttonLikeDisabled = false;
        this.getLocalsComplete();
      }, error => {
        this.buttonLikeDisabled = false;
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
    return `${day}/${month}/${year}`;
  }

  checkLikes(likes: Array<any>): boolean {
    let id: string | null = sessionStorage.getItem('id_skater');
    let haveId: boolean = false;
    likes.forEach((element: any) => {
      if (element.fk_skater == id) {
        haveId = true;
      }
    });
    return haveId;
  }

  calculateRows(text: string): number {
    let result = text.split('\n');
    if (result.length + 3 < 7) {
      return result.length;
    }
    return 7;
  }

  openComments(coments: Array<any>, id: number): void {
    coments.sort((a, b) => {
      let indexA = coments.indexOf(a);
      let indexB = coments.indexOf(b);
      return indexB - indexA;
    });
    this.dialog.open(DialgoCommentsComponent, {
      data: {
        coments: coments,
        id_local: id
      },
      width: '95svw'
    })
  }
}
