import { Component, OnInit } from '@angular/core';
import { EnsembleService } from '../../services/ensemble.service';
import { NewsService } from '../../services/news.service';
import { PerformanceService } from '../../services/performance.service';
import { SeatService } from '../../services/seat.service';
import { EnsembleDto } from '../../dto/EnsambleDto';
import { PerformanceDTO } from '../../dto/PerfomanceDto';
import { PerformanceTicketPriceDto } from '../../dto/PerfomanceTicketPriceDTO';
import { NewsDto } from '../../dto/NewsDto';
import { Actor } from '../../models/actor.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  news: NewsDto = { newsTitle: '', newsDate: new Date(), newsDescription: '', newsImage: null };
  performance: PerformanceDTO = {
    performance_title: '',
    performance_description: '',
    performance_date: new Date(),
    hallId: 1,
    created_at: new Date(),  // Set created_at to current date
    updated_at: undefined,        // Set updated_at to null initially
    director: '',
    adaptation: '',
    dramaturg: '',
    scenographer: '',
    costumeDesigner: '',
    music: '',
    stageSpeech: '',
    stageManager: '',
    revenue: 0,
    poster_image: ''
  };
  ensemble: EnsembleDto = { firstName: '', lastName: '', birthYear: undefined, ensemble_description: '' };
  actorsList: any[] = []; // List of actors from ensemble table
  selectedActors: number[] = [];
  parterPrice?: number;
  balkonPrice?: number;
  lozaPrice?: number;
  constructor(
    private ensembleService: EnsembleService,
    private newsService: NewsService,
    private performanceService: PerformanceService,
    private seatService: SeatService
  ) {}

  ngOnInit() {
    this.getActors();
  }

  logSelectedActors() {
    console.log('Selected Actors:', this.selectedActors);
    console.log('Selected ActorList:', this.actorsList);
  }

  getActors() {
    this.ensembleService.getAllActors().subscribe((data: Actor[]) => {
      this.actorsList = data.map(actor => ({
        label: `${actor.firstName} ${actor.lastName}`,  // Actor full name
        value: actor.ensembleId  // Actor's ensembleId
      }));
    });
  }

  addNews() {

    const formData = new FormData();
    formData.append('newsTitle', this.news.newsTitle || '');
    const dateValue = new Date(this.news.newsDate);
    formData.append('newsDate', !isNaN(dateValue.getTime()) ? dateValue.toISOString().split('T')[0] : '');

    formData.append('newsDescription', this.news.newsDescription || '');
    if (this.news.newsImage) {
      formData.append('newsImage', this.news.newsImage);
    }
    this.newsService.createNews(formData).subscribe(response => {
      console.log('News added:', response);
      this.news = { newsTitle: '', newsDate: new Date(), newsDescription: '', newsImage: '' };
    });
  }

  onFileSelectNews(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.news.newsImage = file;
    }
  }

  onFileSelectPerformance(event: any) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const base64String = e.target.result.split(',')[1];
          this.performance.poster_image = base64String;
        };
        reader.readAsDataURL(file);
      }
    }

  addPerformance() {
    this.performance.created_at = new Date();
    this.performance.updated_at = new Date();
    this.performance.actors = [...this.selectedActors];

    this.performanceService.createPerformance(this.performance).subscribe(response => {
      
      const performanceId = response.performanceId; // ID novog performansa

      if (performanceId === undefined) {
        console.error('Error: performanceId is undefined');
        return;
      }
      console.log('Performance added:', response);

      // Dohvati tipove sedišta za trenutnu salu
      this.seatService.getSeatTypes(this.performance.hallId).subscribe(seatTypes => {
        // Kreiraj niz PerformanceTicketPriceDto
        const ticketPrices: PerformanceTicketPriceDto[] = seatTypes.map(seatType => {
          let price = 0;

          // Dodaj cenu na osnovu tipa sedišta
          if (seatType.seatTypeName === 'PARTER') price = this.parterPrice || 0;
          if (seatType.seatTypeName === 'BALKON') price = this.balkonPrice || 0;
          if (seatType.seatTypeName === 'LOŽA') price = this.lozaPrice || 0;

          return {
            performanceTicketPriceId: -1, // Biće generisan na serveru
            performanceId: performanceId,
            seatTypeId: seatType.seatTypeId,
            price: price
          };
        });

        // Pošalji podatke za svaku cenu karata
        ticketPrices.forEach(ticketPrice => {
          this.performanceService.createTicketPrices(ticketPrice).subscribe(() => {
            console.log('Ticket price added:', ticketPrice);
            this.performance = {
              performance_title: '',
              performance_description: '',
              performance_date: new Date(),
              hallId: 1, // Postavi default vrednost
              created_at: new Date(),
              updated_at: undefined,
              director: '',
              adaptation: '',
              dramaturg: '',
              scenographer: '',
              costumeDesigner: '',
              music: '',
              stageSpeech: '',
              stageManager: '',
              revenue: 0,
              poster_image: ''
            };
            this.selectedActors = [];
            this.parterPrice = undefined;
            this.balkonPrice = undefined;
            this.lozaPrice = undefined;
          });
        });
      });
    }, error => {
      console.error('Error creating performance:', error);
      alert('Greška pri kreiranju predstave: ' + error.message);
    });
  }

  addActor() {
    this.ensembleService.createEnsemble(this.ensemble).subscribe(response => {
      console.log('Actor added:', response);
      this.ensemble = { firstName: '', lastName: '', birthYear: undefined, ensemble_description: '' };
    });
  }
}
