import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PerformanceService } from '../../services/performance.service'; 
import { EnsembleService } from '../../services/ensemble.service';
import { Performance } from '../../models/performance.model';
import { Actor } from '../../models/actor.model'; 

@Component({
  selector: 'app-performance-detail',
  templateUrl: './performance-detail.component.html',
  styleUrls: ['./performance-detail.component.css']
})
export class PerformanceDetailComponent implements OnInit {
  performance: any;
  actors: Actor[] = [];

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private performanceService: PerformanceService,
    private ensembleService: EnsembleService
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
      
      if (this.performance.actors && this.performance.actors.length > 0) {
        this.loadActors(this.performance.actors);
      }
    }, error => {
      console.error('Failed to load performance details', error);
    });
  }

  loadActors(actorIds: number[]) {
    this.ensembleService.getAllActors().subscribe((allActors: Actor[]) => {
      this.actors = allActors.filter(actor => actorIds.includes(actor.ensembleId!));
    }, error => {
      console.error('Failed to load actors', error);
    });
  }

  getImageSrc(imageData: string | undefined | null): string {
    if (imageData) {
      return 'data:image/jpeg;base64,' + imageData;
    } else {
      return 'assets/images/defaultBlack.jpg';
    }
  }

  showActorImage(actor: any) {
    actor.hovered = true;
  }

  hideActorImage() {
    this.actors.forEach((actor: any) => actor.hovered = false);
  }

  getActorImageSrc(actor: Actor): string {
    if (actor.imageSrc) {
      return actor.imageSrc;
    } else {
      return 'assets/images/defaultBlack.jpg';
    }
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
