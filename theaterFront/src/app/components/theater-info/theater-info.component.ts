import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-theater-info',
  templateUrl: './theater-info.component.html',
  styleUrls: ['./theater-info.component.scss']
})
export class TheaterInfoComponent {

  constructor(private router: Router) { }

  navigateToHistory() {
    this.router.navigate(['/history']);
  }
}
