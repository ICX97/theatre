import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Actor } from '../../models/actor.model';
import { EnsembleService} from '../../services/ensemble.service';

@Component({
  selector: 'app-ansambl',
  templateUrl: './ansambl.component.html',
  styleUrls: ['./ansambl.component.css']
})
export class AnsamblComponent {
  actors: Actor[] = [];

  constructor(private router: Router, private ensembleService: EnsembleService) { }

  ngOnInit(): void {
    this.ensembleService.getAllActors().subscribe((data: Actor[]) => {
      this.actors = data.map(actor => ({
        ...actor,
        hovered: false 
      }));
    });
  }

  goToActor(actorId: number): void {
    this.router.navigate(['/actor', actorId]);
  }

  getImageSrc(imageData: string | null | undefined): string {
    if (imageData) {
      return 'data:image/jpeg;base64,' + imageData;
    } else {
      return 'assets/images/defaultBlack.jpg';
    }
  }
}
