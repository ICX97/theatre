import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PerformanceService } from '../../services/performance.service'; // Importuj servis
import { Performance } from '../../models/performance.model'; // Importuj model


@Component({
  selector: 'app-performances',
  templateUrl: './performances.component.html',
  styleUrls: ['./performances.component.css']
})
export class PerformancesComponent implements OnInit {
  performances: Performance[] = [];

  constructor(private router: Router, private performanceService: PerformanceService) {}

  ngOnInit() {
    this.fetchPerformances();
  }

  fetchPerformances() {
    this.performanceService.getPerformances().subscribe((data: Performance[]) => {
      this.performances = data;
    });
  }

  navigateToDetail(id: number) {
    this.router.navigate(['/performance', id]);
  }
}
