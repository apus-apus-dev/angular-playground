import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'apus-apus-dev';
  headerItems = [
    {id:'about', link: '/about', title: 'About'},
    {id:'people', link: '/people', title: 'People'},
    {id:'projects', link: '/projects', title: 'Projects'},
  ]
}
