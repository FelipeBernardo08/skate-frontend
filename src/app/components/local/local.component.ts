import { Component, OnInit } from '@angular/core';
import { LocalService } from 'src/app/services/local.service';

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

  ngOnInit(): void {
    this.localService.readLocals().subscribe((resp: any) => {
      setTimeout(() => {
        this.local = resp
        this.loader = false;
      }, 1000);
    })
  }

}
