import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  contentSideBar: Array<any> = [
    {
      name: 'location_on',
      link: '/'
    },
    {
      name: 'add',
      link: '/include'
    },
    {
      name: 'newspaper',
      link: '/product'
    },
    {
      name: 'person',
      link: '/profile'
    }
  ];
}
