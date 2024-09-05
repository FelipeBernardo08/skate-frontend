import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUserSession();
  }

  getUserSession(): void {
    let token: string | null = sessionStorage.getItem('token');
    if (token == null || token == '') {
      this.router.navigate(['/login']);
    }
  }

}
