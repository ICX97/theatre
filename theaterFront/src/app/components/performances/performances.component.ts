import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PerformanceService } from '../../services/performance.service'; 
import { Performance } from '../../models/performance.model'; 


@Component({
  selector: 'app-performances',
  templateUrl: './performances.component.html',
  styleUrls: ['./performances.component.css']
})
export class PerformancesComponent implements OnInit {
  performances: (Performance & { hovered?: boolean })[] = [];

  constructor(private router: Router, private performanceService: PerformanceService) {}

  ngOnInit() {
    this.fetchPerformances();
  }

  fetchPerformances() {
    this.performanceService.getPerformances().subscribe((data: Performance[]) => {
      this.performances = data.sort((a, b) => {
        const dateA = new Date(a.performance_date);
        const dateB = new Date(b.performance_date);
        return dateA.getTime() - dateB.getTime();
      }).map(performance => ({
        ...performance,
        hovered: false
      }));
    });
  }

  getImageSrc(imageData: string | undefined | null): string {
    if (imageData) {
      return 'data:image/jpeg;base64,' + imageData;
    } else {
      return 'assets/images/defaultBlack.jpg';
    }
  }

  navigateToDetail(id: number) {
    this.router.navigate(['/performance', id]);
  }
}
