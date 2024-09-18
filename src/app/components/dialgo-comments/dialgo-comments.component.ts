import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventCommentService } from 'src/app/services/event-comment.service';
import { LocalService } from 'src/app/services/local.service';
import { SnackMessageService } from 'src/app/services/snack-message.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dialgo-comments',
  templateUrl: './dialgo-comments.component.html',
  styleUrls: ['./dialgo-comments.component.css']
})
export class DialgoCommentsComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialgoCommentsComponent>,
    private localService: LocalService,
    private snackMessageService: SnackMessageService,
    private eventComentService: EventCommentService
  ) { }

  commentPayload: any = {
    coment: '',
    id_local: ''
  }

  storageUrl: string = environment.BASE_URL_STORAGE;

  image: string = 'https://www.eventim.com.br/obj/media/BR-eventim/teaser/evo/artwork/2020/KNOTFEST_MAPA_SP_v6.png'

  ngOnInit(): void {
    this.commentPayload.id_local = this.data.id_local
  }

  onClose(): void {
    this.dialogRef.close();
  }

  userAuthenticate(): boolean {
    if (sessionStorage.getItem('token') != null) {
      return true;
    }
    return false;
  }

  sendComent(): void {
    this.localService.sendCommentToLocal(this.commentPayload).subscribe((resp: any) => {
      this.commentPayload.coment = '';
      this.snackMessageService.snackMessage('Comentário enviado com sucesso!');
      this.eventComentService.sendComment(this.commentPayload.id_local);
      this.onClose();
    })
  }

  returnImage(image: string): string | null {
    let finalImage: string = this.storageUrl + '/' + image
    return finalImage;
  }

  countRows(coment: string): number {
    let result = coment.split('\n');
    if (result.length < 5) {
      return result.length;
    }
    return 5;
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
}
