import { Component, OnInit } from '@angular/core';

interface Performance {
  name: string;
  time: string;
  description: string;
  image: string;
  day: string;
}

@Component({
  selector: 'app-upcoming-performances',
  templateUrl: './upcoming-performances.component.html',
  styleUrls: ['./upcoming-performances.component.css']
})
export class UpcomingPerformancesComponent implements OnInit {
  performances: Performance[] = [];
  
  ngOnInit(): void {
    // Generiši 14 dana od trenutnog dana
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(today);
      currentDay.setDate(today.getDate() + i);

      this.performances.push({
        name: `Predstava ${i + 1}`,
        time: '20:00',
        description: 'Kratak opis predstave',
        image: 'assets/images/slide3.jpg',  
        day: currentDay.toLocaleDateString('sr-RS', { weekday: 'long', day: 'numeric', month: 'long' })
      });
    }
  }
}
