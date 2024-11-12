import { Component, OnInit } from '@angular/core';
import { EnsembleService } from '../../services/ensemble.service';
import { NewsService } from '../../services/news.service';
import { PerformanceService } from '../../services/performance.service';
import { EnsembleDto } from '../../dto/EnsambleDto';
import { PerformanceDTO } from '../../dto/PerfomanceDto';
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
    hallId: 0,
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
  constructor(
    private ensembleService: EnsembleService,
    private newsService: NewsService,
    private performanceService: PerformanceService
  ) {}

  ngOnInit() {
    this.getActors(); 
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
    formData.append('newsDate', this.news.newsDate instanceof Date ? this.news.newsDate.toISOString().split('T')[0] : '');
    formData.append('newsDescription', this.news.newsDescription || '');
    if (this.news.newsImage) {
      formData.append('newsImage', this.news.newsImage); // Dodajemo sliku ako je korisnik odabrao
    }
    this.newsService.createNews(formData).subscribe(response => {
      console.log('News added:', response);
      this.news = { newsTitle: '', newsDate: new Date(), newsDescription: '', newsImage: '' };
    });
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.news.newsImage = file;
    }
  }

  addPerformance() {
    this.performance.created_at = new Date();
    this.performance.updated_at = new Date();
    this.performance.actors = [...this.selectedActors];
    this.performanceService.createPerformance(this.performance).subscribe(response => {
      console.log('Performance added:', response);
      this.performance = { 
        performance_title: '', 
        performance_description: '', 
        performance_date: new Date(), 
        hallId: 0,
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
    });
  }

  addActor() {
    this.ensembleService.createEnsemble(this.ensemble).subscribe(response => {
      console.log('Actor added:', response);
      this.ensemble = { firstName: '', lastName: '', birthYear: undefined, ensemble_description: '' };
    });
  }
}
