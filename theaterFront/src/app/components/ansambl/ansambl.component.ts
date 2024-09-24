import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Actor {
  id: number;
  name: string;
  surname: string;
  image: string;
  hovered?: boolean; // Dodaj ovo svojstvo
}

@Component({
  selector: 'app-ansambl',
  templateUrl: './ansambl.component.html',
  styleUrls: ['./ansambl.component.css']
})
export class AnsamblComponent {
  actors: Actor[] = [
    { id: 1, name: 'Milan', surname: 'Marić', image: 'assets/images/slide1.jpg' },
    { id: 2, name: 'Natasha', surname: 'Ninković', image: 'assets/images/slide2.jpg' },
    { id: 3, name: 'Bojan', surname: 'Dimitrijević', image: 'assets/images/slide3.jpg' },
    // Dodaj ostale glumce
  ];
  constructor(private router: Router) { }

  ngOnInit(): void { }

  goToActor(actorId: number): void {
    this.router.navigate(['/actor', actorId]);
  }
}
