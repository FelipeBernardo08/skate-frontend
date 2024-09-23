import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from 'src/app/services/local.service';
import { SnackMessageService } from 'src/app/services/snack-message.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-locals',
  templateUrl: './my-locals.component.html',
  styleUrls: ['./my-locals.component.css']
})
export class MyLocalsComponent implements OnInit {

  constructor(
    private router: Router,
    private snackMessageService: SnackMessageService,
    private localService: LocalService
  ) { }

  local: Array<any> = [];

  localUpdatePayload: any;

  loader: boolean = true;

  storageUrl: string = environment.BASE_URL_STORAGE;


  ngOnInit(): void {
    if (!this.checkToken()) {
      this.snackMessageService.snackMessage('Efetue o login primeiro!');
      this.router.navigate(['/login'])
    } else {
      this.getLocalBySkater()
    }
  }

  checkToken(): boolean {
    return sessionStorage.getItem('token') != null;
  }

  getLocalBySkater(): void {
    this.localService.readLocalBySkater().subscribe((resp: any) => {
      this.local = resp;
      this.loader = false;
    }, (error: any) => {
      this.loader = false;
    })
  }

  countRows(coment: string): number {
    let result = coment.split('\n');
    if (result.length < 5) {
      return result.length;
    }
    return 5;
  }

  openUpdateLocal(id: number): void {
    this.router.navigate([`/update-spots/${id}`]);
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
