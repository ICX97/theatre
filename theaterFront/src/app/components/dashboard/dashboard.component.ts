import { Component, OnInit } from '@angular/core';
import { EnsembleService } from '../../services/ensemble.service';
import { NewsService } from '../../services/news.service';
import { PerformanceService } from '../../services/performance.service';
import { SeatService } from '../../services/seat.service';
import { AuthService } from '../../services/auth.service';
import { EnsembleDto } from '../../dto/EnsambleDto';
import { PerformanceDTO } from '../../dto/PerfomanceDto';
import { PerformanceTicketPriceDto } from '../../dto/PerfomanceTicketPriceDTO';
import { NewsDto } from '../../dto/NewsDto';
import { Actor } from '../../models/actor.model';
import { PerformanceWithPrices } from '../../models/performance-ticket-price.model';
import { jwtDecode } from 'jwt-decode';
import { News } from '../../services/news.service';

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
  ensemble: EnsembleDto = { firstName: '', lastName: '', birthYear: undefined, ensemble_description: '' };
  actorsList: any[] = []; 
  selectedActors: number[] = [];
  parterPrice?: number;
  balkonPrice?: number;
  lozaPrice?: number;
  
  // Edit functionality properties
  isAdmin: boolean = false;
  existingPerformances: PerformanceWithPrices[] = [];
  existingNews: News[] = [];
  existingActors: Actor[] = [];
  seatTypes: any[] = []; // Za mapiranje seatTypeId na imena
  
  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalNews: number = 0;
  
  // Actor pagination properties
  currentActorPage: number = 1;
  itemsPerActorPage: number = 5;
  totalActors: number = 0;
  
  // Performance pagination properties
  currentPerformancePage: number = 1;
  itemsPerPerformancePage: number = 5;
  totalPerformances: number = 0;
  
  // Edit modals
  showEditPerformanceModal: boolean = false;
  showEditNewsModal: boolean = false;
  showEditActorModal: boolean = false;
  modalMode: 'edit' | 'delete' = 'edit';
  
  // News management dropdown
  showNewsManagement: boolean = false;
  
  // Actor management dropdown
  showActorManagement: boolean = false;
  
  // Performance management dropdown
  showPerformanceManagement: boolean = false;
  
  // Loading state
  isCreatingPerformance: boolean = false;
  
  // Edit objects
  editPerformance: PerformanceDTO = {} as PerformanceDTO;
  editNews: News = {} as News;
  editActor: Actor = {} as Actor;
  constructor(
    private ensembleService: EnsembleService,
    private newsService: NewsService,
    private performanceService: PerformanceService,
    private seatService: SeatService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.checkAdminRole();
    this.getActors();
    this.loadSeatTypes();
    this.loadExistingData();
  }



  getActors() {
    this.ensembleService.getAllActors().subscribe((data: Actor[]) => {
      this.actorsList = data.map(actor => ({
        label: `${actor.firstName} ${actor.lastName}`, 
        value: actor.ensembleId  
      }));
    });
  }

  loadSeatTypes() {
    this.seatService.getAllSeatTypes().subscribe((seatTypes: any[]) => {
      this.seatTypes = seatTypes;
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
    this.isCreatingPerformance = true;
    this.performance.created_at = new Date();
    this.performance.updated_at = new Date();
    this.performance.actors = [...this.selectedActors];

    this.performanceService.createPerformance(this.performance).subscribe(response => {
      
      const performanceId = response.performanceId; 

      if (performanceId === undefined) {
        console.error('Error: performanceId is undefined');
        return;
      }

      this.seatService.getSeatTypes(this.performance.hallId).subscribe(seatTypes => {
        const ticketPrices: PerformanceTicketPriceDto[] = seatTypes.map(seatType => {
          let price = 0;

          if (seatType.seatTypeName === 'PARTER') price = this.parterPrice || 0;
          if (seatType.seatTypeName === 'BALKON') price = this.balkonPrice || 0;
          if (seatType.seatTypeName === 'LOŽA') price = this.lozaPrice || 0;

          return {
            performanceTicketPriceId: -1, 
            performanceId: performanceId,
            seatTypeId: seatType.seatTypeId,
            price: price
          };
        });

        let completedRequests = 0;
        const totalRequests = ticketPrices.length;
        
        ticketPrices.forEach(ticketPrice => {
          this.performanceService.createTicketPrices(ticketPrice).subscribe(() => {
            completedRequests++;
            
            if (completedRequests === totalRequests) {
              this.isCreatingPerformance = false;
              alert('Predstava je uspešno dodana!');
              
              this.performance = {
                performance_title: '',
                performance_description: '',
                performance_date: new Date(),
                hallId: 1,
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
            }
          });
        });
      });
    }, error => {
      this.isCreatingPerformance = false;
      console.error('Error creating performance:', error);
      alert('Greška pri kreiranju predstave: ' + error.message);
    });
  }

  addActor() {
    this.ensembleService.createEnsemble(this.ensemble).subscribe(response => {
      this.ensemble = { firstName: '', lastName: '', birthYear: undefined, ensemble_description: '' };
    });
  }

  // Admin role check
  checkAdminRole(): void {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        this.isAdmin = decodedToken.role === 'ROLE_ADMIN';
      } catch (error) {
        console.error('Error decoding token:', error);
        this.isAdmin = false;
      }
    } else {
      this.isAdmin = false;
    }
  }

  // Load existing data for editing
  loadExistingData(): void {
    this.loadPerformances();
    this.loadNews();
    this.loadActors();
  }

  loadPerformances(): void {
    this.performanceService.getPerformancesWithPrices().subscribe(
      (performances: PerformanceWithPrices[]) => {
        this.existingPerformances = performances;
        this.totalPerformances = performances.length;
        this.currentPerformancePage = 1; // Reset to first page when data loads
      },
      (error: any) => {
        console.error('Error loading performances:', error);
      }
    );
  }

  loadNews(): void {
    this.newsService.getNews().subscribe(
      (news: News[]) => {
        this.existingNews = news;
        this.totalNews = news.length;
        this.currentPage = 1; // Reset to first page when data loads
      },
      (error: any) => {
        console.error('Error loading news:', error);
      }
    );
  }

  loadActors(): void {
    this.ensembleService.getAllActors().subscribe(
      (actors: Actor[]) => {
        this.existingActors = actors;
        this.totalActors = actors.length;
        this.currentActorPage = 1; // Reset to first page when data loads
      },
      (error: any) => {
        console.error('Error loading actors:', error);
      }
    );
  }

  // Edit methods
  openEditPerformanceModal(performance: PerformanceWithPrices): void {
    this.editPerformance = {
      performanceId: performance.performanceId,
      performance_title: performance.performance_title,
      performance_description: performance.performance_description,
      performance_date: performance.performance_date,
      hallId: performance.hallId,
      actors: performance.actors,
      director: performance.director,
      adaptation: performance.adaptation,
      dramaturg: performance.dramaturg,
      scenographer: performance.scenographer,
      costumeDesigner: performance.costumeDesigner,
      music: performance.music,
      stageSpeech: performance.stageSpeech,
      stageManager: performance.stageManager
    } as PerformanceDTO;
    this.modalMode = 'edit';
    this.showEditPerformanceModal = true;
  }

  openDeletePerformanceModal(performance: PerformanceWithPrices): void {
    this.editPerformance = {
      performanceId: performance.performanceId,
      performance_title: performance.performance_title,
      performance_description: performance.performance_description,
      performance_date: performance.performance_date,
      hallId: performance.hallId,
      actors: performance.actors,
      director: performance.director,
      adaptation: performance.adaptation,
      dramaturg: performance.dramaturg,
      scenographer: performance.scenographer,
      costumeDesigner: performance.costumeDesigner,
      music: performance.music,
      stageSpeech: performance.stageSpeech,
      stageManager: performance.stageManager
    } as PerformanceDTO;
    this.modalMode = 'delete';
    this.showEditPerformanceModal = true;
  }

  openEditNewsModal(news: News): void {
    this.editNews = { ...news };
    this.modalMode = 'edit';
    this.showEditNewsModal = true;
  }

  openDeleteNewsModal(news: News): void {
    this.editNews = { ...news };
    this.modalMode = 'delete';
    this.showEditNewsModal = true;
  }

  openEditActorModal(actor: Actor): void {
    this.editActor = { ...actor };
    this.modalMode = 'edit';
    this.showEditActorModal = true;
  }

  openDeleteActorModal(actor: Actor): void {
    this.editActor = { ...actor };
    this.modalMode = 'delete';
    this.showEditActorModal = true;
  }

  closeEditModals(): void {
    this.showEditPerformanceModal = false;
    this.showEditNewsModal = false;
    this.showEditActorModal = false;
  }

  // News management dropdown toggle
  toggleNewsManagement(): void {
    this.showNewsManagement = !this.showNewsManagement;
  }

  // Actor management dropdown toggle
  toggleActorManagement(): void {
    this.showActorManagement = !this.showActorManagement;
  }

  // Performance management dropdown toggle
  togglePerformanceManagement(): void {
    this.showPerformanceManagement = !this.showPerformanceManagement;
  }

  // Update methods
  updatePerformance(): void {
    this.closeEditModals();
  }

  // Performance modal event handlers
  onPerformanceSave(performance: PerformanceDTO): void {
    const id = performance.performanceId;
    if (!id) {
      console.error('No performanceId provided for update');
      return;
    }
    
    this.performanceService.updatePerformance(id, performance).subscribe({
      next: (response: PerformanceDTO) => {
        this.loadPerformances();
        this.closeEditModals();
        alert('Performance updated successfully!');
      },
      error: (err) => {
        console.error('Error updating performance:', err);
        alert('Greška pri ažuriranju predstave: ' + err.message);
      }
    });
  }

  onPerformanceDelete(performanceId: number): void {
    this.deletePerformance(performanceId);
  }


  updateActor(): void {
    this.closeEditModals();
  }

  // Actor modal event handlers
  onActorSave(actor: Actor): void {
    const id = actor.ensembleId;
    if (!id) {
      console.error('No ensembleId provided for update');
      return;
    }
    
    this.ensembleService.updateActor(id, actor).subscribe({
      next: (response: Actor) => {

        this.loadActors();
        this.closeEditModals();
        alert('Actor updated successfully!');
      },
      error: (err) => {
        console.error('Error updating actor:', err);
        alert('Greška pri ažuriranju glumca: ' + err.message);
      }
    });
  }

  onActorDelete(actorId: number): void {
    this.deleteActor(actorId);
  }

  // Delete methods
  deletePerformance(performanceId: number): void {
    this.performanceService.deletePerformance(performanceId).subscribe({
      next: () => {
        this.loadPerformances();
        this.closeEditModals();
        alert('Performance deleted successfully!');
      },
      error: (err) => {
        console.error('Error deleting performance:', err);
        alert('Greška pri brisanju predstave: ' + err.message);
      }
    });
  }

  deleteNews(newsId: number): void {
    this.newsService.deleteNews(newsId).subscribe({
      next: () => {
        this.loadNews();
        alert('News deleted successfully!');
      },
      error: (err) => {
        console.error('Error deleting news:', err);
        alert('Greška pri brisanju vesti: ' + err.message);
      }
    });
  }

  // Modal event handlers
  onNewsSave(news: News): void {
    const id = news.newsId;
    if (!id) {
      console.error('No newsId provided for update');
      return;
    }
    
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Niste ulogovani! Molimo prijavite se ponovo.');
      return;
    }
    
    const formData = new FormData();
    formData.append('newsTitle', news.newsTitle || '');
    const dateValue = new Date(news.newsDate);
    formData.append('newsDate', !isNaN(dateValue.getTime()) ? dateValue.toISOString().split('T')[0] : '');
    formData.append('newsDescription', news.newsDescription || '');
    
    if ((news as any).newsImage instanceof File) {
      formData.append('newsImage', (news as any).newsImage);
    }
    
    this.newsService.updateNews(id, formData).subscribe({
      next: (response) => {
        this.loadNews();
        this.closeEditModals();
        alert('News updated successfully!');
      },
      error: (err) => {
        console.error('Error updating news:', err);
        console.error('Error status:', err.status);
        console.error('Error message:', err.message);
        console.error('Error details:', err.error);
        
        if (err.status === 403) {
          alert('Nemate dozvolu za ažuriranje vesti. Proverite da li ste admin.');
        } else {
          alert('Greška pri ažuriranju vesti: ' + err.message);
        }
      }
    });
  }

  onNewsDelete(newsId: number): void {
    this.deleteNews(newsId);
  }

  deleteActor(actorId: number): void {
    this.ensembleService.deleteActor(actorId).subscribe({
      next: () => {
        this.loadActors();
        this.closeEditModals();
        alert('Actor deleted successfully!');
      },
      error: (err) => {
        console.error('Error deleting actor:', err);
        alert('Greška pri brisanju glumca: ' + err.message);
      }
    });
  }

  // Pagination methods
  get paginatedNews(): News[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.existingNews.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.totalNews / this.itemsPerPage);
  }

  get hasNextPage(): boolean {
    return this.currentPage < this.totalPages;
  }

  get hasPreviousPage(): boolean {
    return this.currentPage > 1;
  }

  nextPage(): void {
    if (this.hasNextPage) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.hasPreviousPage) {
      this.currentPage--;
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  // Actor pagination methods
  get paginatedActors(): Actor[] {
    const startIndex = (this.currentActorPage - 1) * this.itemsPerActorPage;
    const endIndex = startIndex + this.itemsPerActorPage;
    return this.existingActors.slice(startIndex, endIndex);
  }

  get totalActorPages(): number {
    return Math.ceil(this.totalActors / this.itemsPerActorPage);
  }

  get hasNextActorPage(): boolean {
    return this.currentActorPage < this.totalActorPages;
  }

  get hasPreviousActorPage(): boolean {
    return this.currentActorPage > 1;
  }

  nextActorPage(): void {
    if (this.hasNextActorPage) {
      this.currentActorPage++;
    }
  }

  previousActorPage(): void {
    if (this.hasPreviousActorPage) {
      this.currentActorPage--;
    }
  }

  goToActorPage(page: number): void {
    if (page >= 1 && page <= this.totalActorPages) {
      this.currentActorPage = page;
    }
  }

  getActorPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, this.currentActorPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(this.totalActorPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  // Performance pagination methods
  get paginatedPerformances(): PerformanceWithPrices[] {
    const startIndex = (this.currentPerformancePage - 1) * this.itemsPerPerformancePage;
    const endIndex = startIndex + this.itemsPerPerformancePage;
    return this.existingPerformances.slice(startIndex, endIndex);
  }

  get totalPerformancePages(): number {
    return Math.ceil(this.totalPerformances / this.itemsPerPerformancePage);
  }

  get hasNextPerformancePage(): boolean {
    return this.currentPerformancePage < this.totalPerformancePages;
  }

  get hasPreviousPerformancePage(): boolean {
    return this.currentPerformancePage > 1;
  }

  nextPerformancePage(): void {
    if (this.hasNextPerformancePage) {
      this.currentPerformancePage++;
    }
  }

  previousPerformancePage(): void {
    if (this.hasPreviousPerformancePage) {
      this.currentPerformancePage--;
    }
  }

  goToPerformancePage(page: number): void {
    if (page >= 1 && page <= this.totalPerformancePages) {
      this.currentPerformancePage = page;
    }
  }

  getPerformancePageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, this.currentPerformancePage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(this.totalPerformancePages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  // Helper method for template
  get min(): any {
    return Math.min;
  }

  // Helper methods for performance display
  getActorsNames(actorIds: number[]): string {
    if (!actorIds || actorIds.length === 0) {
      return 'No actors assigned';
    }
    
    const actorNames = actorIds.map(id => {
      const actor = this.actorsList.find(a => a.value === id);
      return actor ? actor.label : `Actor ${id}`;
    });
    
    return actorNames.join(', ');
  }

  getTicketPricesInfo(ticketPrices: any[]): string {
    if (!ticketPrices || ticketPrices.length === 0) {
      return 'No prices set';
    }
    
    const priceInfo = ticketPrices.map(tp => {
      const seatTypeName = this.getSeatTypeName(tp.seatTypeId);
      return `${seatTypeName}: ${tp.price}din`;
    });
    
    return priceInfo.join(', ');
  }

  getSeatTypeName(seatTypeId: number): string {
    const seatType = this.seatTypes.find(st => st.seatTypeId === seatTypeId);
    return seatType ? seatType.seatTypeName : `Type ${seatTypeId}`;
  }
}
