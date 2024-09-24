// actor.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {
  actor: any;

  actors = [
    { id: 1, name: 'Ime', surname: 'Prezime', image: 'path/to/image1.jpg', history: 'Kratak istorijat...', performances: ['Predstava 1', 'Predstava 2'] },
    { id: 2, name: 'Ime2', surname: 'Prezime2', image: 'path/to/image2.jpg', history: 'Kratak istorijat...', performances: ['Predstava 3', 'Predstava 4'] },
    // Dodajte ostale glumce ovde
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      const actorId = +id;
      this.actor = this.actors.find(actor => actor.id === actorId);
    }
  }
  
}
