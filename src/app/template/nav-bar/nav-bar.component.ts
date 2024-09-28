import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventChangepageService } from 'src/app/services/event-changepage.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(
    private router: Router,
    private eventChangePageService: EventChangepageService
  ) { }

  page: string | null = '';

  ngOnInit(): void {
    this.eventChangePageService.eventEmitter.subscribe(() => {
      this.getAtualPage();
    })
    this.getAtualPage();
  }

  contentSideBar: Array<any> = [
    {
      name: 'location_on',
      link: '/',
      title: 'local'
    },
    {
      name: 'add',
      link: '/include',
      title: 'include'
    },
    {
      name: 'newspaper',
      link: '/product',
      title: 'home'
    },
    {
      name: 'person',
      link: '/profile',
      title: 'profile'
    }
  ];

  getAtualPage(): void {
    this.page = sessionStorage.getItem('page');
  }

  goToPage(link: String): void {
    this.router.navigate([`/${link}`])
  }
}
