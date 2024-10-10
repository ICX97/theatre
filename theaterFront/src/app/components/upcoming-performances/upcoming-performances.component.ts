import { Component, OnInit } from '@angular/core';
import { PerformanceService } from '../../services/performance.service'; // Import the service
import { Performance } from '../../models/performance.model';


@Component({
  selector: 'app-upcoming-performances',
  templateUrl: './upcoming-performances.component.html',
  styleUrls: ['./upcoming-performances.component.css']
})
export class UpcomingPerformancesComponent implements OnInit {
  performances: Performance[] = [];

  constructor(private performanceService: PerformanceService) {}

  ngOnInit(): void {
    this.fetchPerformances();
  }

  fetchPerformances(): void {
    this.performanceService.getPerformances().subscribe((data) => {
      this.performances = data;
    });
  }

  getImageSrc(imageData: string | undefined | null): string {
    if (imageData) {
      return 'data:image/jpeg;base64,' + imageData;
    } else {
      return 'assets/images/defaultBlack.jpg'; // Default slika10 
    }
  }
}