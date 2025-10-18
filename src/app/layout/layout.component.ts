import { Component } from '@angular/core';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    standalone: false
})
export class LayoutComponent {
  headerItems = [
    {id:'about', link: '/about', title: 'About'},
    {id:'people', link: '/people', title: 'People'},
    {id:'projects', link: '/projects', title: 'Projects'},
  ]
}
