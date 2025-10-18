import { Component } from '@angular/core';


@Component({
    selector: 'app-cypher-helper',
    templateUrl: './cypher-helper.component.html',
    styleUrls: ['./cypher-helper.component.scss'],
    standalone: false
})
export class CypherHelperComponent {
  latitude: number = 0;
  longitude: number = 0;
  bg: any;
  constructor() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
        });
      } else {
        console.log(' (((( ');
      }
  }
}
