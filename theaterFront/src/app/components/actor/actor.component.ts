import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Actor } from '../../models/actor.model';
import { EnsembleService} from '../../services/ensemble.service';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {
  actor: Actor | null = null;

  constructor(private route: ActivatedRoute, private ensembleService: EnsembleService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      const actorId = +id;
      this.ensembleService.getActorById(actorId).subscribe(data => {
        this.actor = {
          ...data, 
          imageSrc: 'assets/images/' + data.ensembleId + '.jpg', 
          hovered: false
        };
        console.log('Actor data:', this.actor);
      });
    }
  }
}
