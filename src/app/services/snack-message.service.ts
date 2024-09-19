import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackMessageService {
  constructor(
    public snackBar: MatSnackBar
  ) { }

  public snackMessage(message: string): void {
    this.snackBar.open(message, 'X', {
      duration: 5000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: ['custom-snackbar']
    });
  }
}
