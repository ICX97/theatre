import { Component } from '@angular/core';

interface Performance {
  day: string;
  date: string;
  poster: string;
  time: string;
  hall: string;
  title: string;
  director: string;
  cast: string;
  ticketPrices: {
    parter: string;
    balcony: string;
    box: string;
  };
}

@Component({
  selector: 'app-repertoar',
  templateUrl: './repertoar.component.html',
  styleUrls: ['./repertoar.component.css']
})
export class RepertoarComponent {
  months: string[] = ['Septembar', 'Oktobar', 'Novembar'];
  selectedMonth: string = this.months[0];  // Default selected month

  performances: { [key: string]: Performance[] } = {
    'Septembar': [
      {
        day: 'Petak',
        date: '15. Septembar',
        poster: 'assets/images/edip.jpg',
        time: '20:00',
        hall: 'Velika scena „Ljuba Tadić”',
        title: 'Edip',
        director: 'Vito Taufer',
        cast: 'Milan Marić, Natasha Ninković, Srđan Timarov, Bojan Dimitrijević...',
        ticketPrices: {
          parter: '1500 RSD',
          balcony: '1200 RSD',
          box: '2000 RSD'
        }
      },
      {
        day: 'Subota',
        date: '16. Septembar',
        poster: 'assets/images/hamlet.jpg',
        time: '19:30',
        hall: 'Velika scena „Ljuba Tadić”',
        title: 'Hamlet',
        director: 'Ivan Vujić',
        cast: 'Joakim Tasić, Marko Radojević, Milan Bobić...',
        ticketPrices: {
          parter: '1600 RSD',
          balcony: '1300 RSD',
          box: '2100 RSD'
        }
      }
      // Dodaj još predstave po potrebi
    ],
    'Oktobar': [],
    'Novembar': []
  };

  selectMonth(month: string) {
    this.selectedMonth = month;
  }
}
