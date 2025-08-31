import { Component, OnInit } from '@angular/core';
import { PerformanceService } from '../../services/performance.service'; // Import the service
import { Performance } from '../../models/performance.model';
import { PerformanceTicketPrice, PerformanceWithPrices } from '../../models/performance-ticket-price.model';
import { TicketPriceService } from '../../services/ticket-price.service';

@Component({
  selector: 'app-repertoar',
  templateUrl: './repertoar.component.html',
  styleUrls: ['./repertoar.component.css']
})
export class RepertoarComponent implements OnInit {
  months: string[] = [];
  selectedMonth: string = '';
  performances: Performance[] = [];
  filteredPerformances: Performance[] = []; 
  performancesWithPrices: PerformanceWithPrices[] = [];
  ticketPrices: { [performanceId: number]: { [seatType: string]: number } } = {};

  constructor(private performanceService: PerformanceService, private ticketPriceService: TicketPriceService) {}

  ngOnInit() {
    this.setMonths();
    this.selectedMonth = this.months[1];  // Automatski postavi trenutni mesec
    this.getPerformances();
    this.getPerformancesWithPrices();
    this.loadTicketPrices();
  }

  setMonths() {
    const now = new Date();
    this.months = [];
    for (let i = 0; i < 3; i++) {
      const monthDate = new Date(now.getFullYear(), now.getMonth() + i);
      const options: Intl.DateTimeFormatOptions = { month: 'long' };
      this.months.push(monthDate.toLocaleDateString('sr-Latn-RS', options));
    }
  }

  loadTicketPrices() {
    const priceRequests = this.performances.map((performance) => {
      return this.ticketPriceService.getTicketPricesByPerformance(performance.performanceId).subscribe((prices) => {
        this.ticketPrices[performance.performanceId] = this.groupPricesBySeatType(prices);
      });
    });

    Promise.all(priceRequests).then(() => {
      this.filterPerformancesByMonth();  // After all prices are loaded, filter performances
    });
  }

  groupPricesBySeatType(prices: PerformanceTicketPrice[]) {
    return prices.reduce((acc: { [key: string]: number }, price) => {
      const seatTypeName = this.getSeatTypeName(price.seatTypeId);
      if (seatTypeName) {
        acc[seatTypeName] = price.price;
      }
      return acc;
    }, {}); // acc is initialized as an empty object
  }

  getSeatTypes(performanceId: number): string[] {
    return this.ticketPrices[performanceId] ? Object.keys(this.ticketPrices[performanceId]) : [];
  }

  getSeatTypeName(seatTypeId: number): string {
    const seatTypeMap: { [key: number]: string } = {
      1: 'PARTER',  // Hall 1 - PARTER
      2: 'PARTER',  // Hall 2 - PARTER
      3: 'LOŽA',    // Hall 1 - LOŽA
      4: 'LOŽA',    // Hall 2 - LOŽA
      5: 'BALKON',  // Hall 1 - BALKON
      6: 'BALKON'   // Hall 2 - BALKON
    };
    return seatTypeMap[seatTypeId as keyof typeof seatTypeMap] || `TIP ${seatTypeId}`;
  }

  getImageSrc(imageData: string | undefined | null): string {
    if (imageData) {
      return 'data:image/jpeg;base64,' + imageData;
    } else {
      return 'assets/images/defaultBlack.jpg'; // Default slika za predstave
    }
  }

  getPerformances() {
    this.performanceService.getPerformances().subscribe((data: Performance[]) => {
      // Filtriraj samo buduće predstave
      const today = new Date();
      this.performances = data.filter(perf => new Date(perf.performance_date) >= today)
        .sort((a, b) => {
          const dateA = new Date(a.performance_date);
          const dateB = new Date(b.performance_date);
          return dateA.getTime() - dateB.getTime();
        });
      this.autoSelectMonthWithPerformances();
      this.filterPerformancesByMonth();
    });
  }

  autoSelectMonthWithPerformances() {
    // Pronađi prvi mesec (od prikazanih dugmića) koji ima predstave
    for (let i = 0; i < this.months.length; i++) {
      const monthName = this.months[i];
      const monthIndex = (new Date().getMonth() + i) % 12;
      const hasPerformance = this.performances.some(perf => new Date(perf.performance_date).getMonth() === monthIndex);
      if (hasPerformance) {
        this.selectedMonth = monthName;
        return;
      }
    }
    // Ako nema nijedne predstave, selektuj prvi mesec
    this.selectedMonth = this.months[0];
  }

  getPerformancesWithPrices() {
    this.performanceService.getPerformancesWithPrices().subscribe((data: PerformanceWithPrices[]) => {
      this.performancesWithPrices = data;
      this.filterPerformancesByMonth();
    });
  }

  selectMonth(month: string) {
    this.selectedMonth = month;
    this.filterPerformancesByMonth(); // Filtriraj predstave kada se promeni mesec
  }

  filterPerformancesByMonth() {
    const now = new Date();
    const monthOffset = this.months.indexOf(this.selectedMonth);
    const targetMonth = (now.getMonth() + monthOffset) % 12;
    const targetYear = now.getFullYear() + Math.floor((now.getMonth() + monthOffset) / 12);

    this.filteredPerformances = this.performances.filter(performance => {
      const perfDate = new Date(performance.performance_date);
      return perfDate.getMonth() === targetMonth && perfDate.getFullYear() === targetYear;
    });

    this.filteredPerformances.forEach(performance => {
      const prices = this.performancesWithPrices.find(p => p.performance_title === performance.performance_title);
      if (prices) {
        performance.ticketPrices = prices.ticketPrices; // Dodavanje ticketPrices
      } else {
        performance.ticketPrices = []; // Ako nema cena, postavi praznu listu
      }
    });
  }

}
