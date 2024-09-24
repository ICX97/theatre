import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Performance {
  id: number;
  title: string;
  director: string;
  writer: string;
  poster: string;
}

@Component({
  selector: 'app-performances',
  templateUrl: './performances.component.html',
  styleUrls: ['./performances.component.css']
})
export class PerformancesComponent implements OnInit {
  performances: Performance[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.fetchPerformances();
  }

  fetchPerformances() {
    // Simuliraj preuzimanje podataka (ovde bi trebao dodati stvarni poziv na API)
    this.performances = [
      {
        id: 1,
        title: 'Edip',
        director: 'Vito Taufer',
        writer: 'Pisac 1',
        poster: 'assets/images/slide1.jpg'
      },
      {
        id: 2,
        title: 'Hamlet',
        director: 'Ivan Vujić',
        writer: 'Pisac 2',
        poster: 'assets/images/slide2.jpg'
      }
    ];
  }

  navigateToDetail(id: number) {
    this.router.navigate(['/performance', id]);
  }
}
