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
    private localService: LocalService
  ) { }

  loader: boolean = true;
  local: Array<any> = [];
  storageUrl: string = environment.BASE_URL_STORAGE;

  ngOnInit(): void {
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
}
