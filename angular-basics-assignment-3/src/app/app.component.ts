import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showSecret = false;
  clickEvents = [];

  toggleSecret() {
    this.showSecret = !this.showSecret;
    this.clickEvents.push(new Date());
  }
}
