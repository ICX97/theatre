import { Component } from '@angular/core';

interface Actor {
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
    { name: 'Milan', surname: 'Marić', image: 'assets/images/milan.jpg' },
    { name: 'Natasha', surname: 'Ninković', image: 'assets/images/natasha.jpg' },
    { name: 'Bojan', surname: 'Dimitrijević', image: 'assets/images/bojan.jpg' },
    // Dodaj ostale glumce
  ];
}
