import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from 'src/app/services/local.service';
import { SnackMessageService } from 'src/app/services/snack-message.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-spots',
  templateUrl: './update-spots.component.html',
  styleUrls: ['./update-spots.component.css']
})
export class UpdateSpotsComponent implements OnInit {

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
      console.log(this.local)
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

  }

}
