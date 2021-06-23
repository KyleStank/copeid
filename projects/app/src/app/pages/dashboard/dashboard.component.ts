import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardPageComponent {
  clicked(e: MouseEvent): void {
    console.log(e);
    alert('Clicked!');
  }
}
