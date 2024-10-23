import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PerformanceService } from '../../services/performance.service'; 
import { Performance } from '../../models/performance.model'; 

@Component({
  selector: 'app-performance-detail',
  templateUrl: './performance-detail.component.html',
  styleUrls: ['./performance-detail.component.css']
})
export class PerformanceDetailComponent implements OnInit {
  performance: any;

  constructor(private route: ActivatedRoute, private router: Router, private performanceService: PerformanceService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.fetchPerformanceDetails(id);
    });
  }

  fetchPerformanceDetails(id: number) {

    this.performanceService.getPerformanceById(id).subscribe((data: Performance) => {
      this.performance = data;
      console.log(this.performance);
    }, error => {
      console.error('Failed to load performance details', error);
    });
  }


  showActorImage(actor: any) {
    actor.hovered = true;
  }

  hideActorImage() {
    this.performance.actors.forEach((actor: any) => actor.hovered = false);
  }

  purchaseTickets() {
    const performanceId = this.performance?.performanceId; 
    if (performanceId) {
      this.router.navigate(['/buy-ticket', performanceId]);
    } else {
      console.error('Performance ID is undefined. Cannot navigate to ticket purchase.');
    }
  }
}
