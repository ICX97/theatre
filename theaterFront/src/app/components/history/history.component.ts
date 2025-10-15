import { Component } from '@angular/core';

interface TimelineEvent {
  year: number;
  title: string;
  description: string;
}

interface FamousPerformance {
  title: string;
  year: number;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  timelineEvents: TimelineEvent[] = [
    {
      year: 1920,
      title: 'Osnivanje pozorišta',
      description: 'Jugoslovensko Dramsko Pozorište osnovano je 1920. godine kao prvo profesionalno pozorište u Beogradu. Prva predstava bila je "Gospođa ministarka" Branislava Nušića.'
    },
    {
      year: 1945,
      title: 'Obnova nakon rata',
      description: 'Nakon Drugog svetskog rata, pozorište je obnovljeno i postalo je centar kulturnog života. Prva posleratna predstava bila je "Na rubu pameti" Branislava Nušića.'
    },
    {
      year: 1960,
      title: 'Zlatno doba',
      description: 'Šezdesete godine predstavljaju zlatno doba pozorišta. Premijerno su izvedene predstave koje su postale klasici jugoslovenske dramske umetnosti.'
    },
    {
      year: 1980,
      title: 'Eksperimentalni period',
      description: 'Osamdesete godine donose eksperimentalne predstave i nove pristupe režiji. Pozorište postaje centar avangardne umetnosti.'
    },
    {
      year: 2000,
      title: 'Novo milenijum',
      description: 'U novom milenijumu pozorište se modernizuje i prilagođava savremenim trendovima, zadržavajući istovremeno svoju tradiciju i kvalitet.'
    },
    {
      year: 2020,
      title: 'Stogodišnjica',
      description: 'Pozorište slavi 100 godina postojanja sa posebnim programom koji obuhvata najbolje predstave iz svoje bogate istorije.'
    }
  ];

  famousPerformances: FamousPerformance[] = [
    {
      title: 'Gospođa ministarka',
      year: 1920,
      description: 'Prva predstava pozorišta, komedija Branislava Nušića koja je postala simbol jugoslovenske dramske umetnosti.',
      icon: '🎪'
    },
    {
      title: 'Kralj Lear',
      year: 1955,
      description: 'Šekspirova tragedija u režiji legendarnog režisera, smatra se jednom od najboljih izvedbi u istoriji pozorišta.',
      icon: '👑'
    },
    {
      title: 'Romeo i Julija',
      year: 1962,
      description: 'Večna ljubavna priča u savremenoj interpretaciji, koja je osvojila publiku i kritiku.',
      icon: '💔'
    },
    {
      title: 'Hamlet',
      year: 1978,
      description: 'Eksperimentalna verzija Hamleta koja je revolucionisala pristup klasičnim delima.',
      icon: '🎭'
    },
    {
      title: 'Tri sestre',
      year: 1985,
      description: 'Čehovljeva drama u modernoj interpretaciji, smatra se remek-delom pozorišne umetnosti.',
      icon: '🎨'
    },
    {
      title: 'Čekajući Godota',
      year: 1992,
      description: 'Beckettov apsurdistički klasik koji je postao simbol pozorišne avangarde.',
      icon: '🌟'
    }
  ];
}
