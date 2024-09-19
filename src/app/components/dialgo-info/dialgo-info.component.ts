import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialgo-info',
  templateUrl: './dialgo-info.component.html',
  styleUrls: ['./dialgo-info.component.css']
})
export class DialgoInfoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialgoInfoComponent>,
  ) { }

  ngOnInit(): void {
  }

}
