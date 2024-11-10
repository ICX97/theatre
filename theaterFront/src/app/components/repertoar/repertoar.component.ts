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
    
    const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1);
    const currentMonth = new Date(now.getFullYear(), now.getMonth());
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1);
  
    const options: Intl.DateTimeFormatOptions = { month: 'long' };
  
    this.months = [
      prevMonth.toLocaleDateString('sr-RS', options),  // Prethodni mesec
      currentMonth.toLocaleDateString('sr-RS', options),  // Trenutni mesec
      nextMonth.toLocaleDateString('sr-RS', options)  // Naredni mesec
    ];
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
      1: 'PARTER',
      2: 'BALKON',
      3: 'LOZA'
    };
    return seatTypeMap[seatTypeId as keyof typeof seatTypeMap] || '';  // Casting seatTypeId
  }

  getPerformances() {
    this.performanceService.getPerformances().subscribe((data: Performance[]) => {
      this.performances = data;
      this.filterPerformancesByMonth(); // Filtriraj po mesecu kada dobijemo podatke
    });
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
    const monthIndex = this.months.indexOf(this.selectedMonth); // Get the index of the selected month
    const currentDate = new Date(); // Get the current date

    // Use the monthIndex to determine the actual month number
    const targetMonth = currentDate.getMonth() + monthIndex - 1; // Adjusting the month index for 0-based months

    this.filteredPerformances = this.performances.filter(performance => {
        const performanceMonth = new Date(performance.performance_date).getMonth(); // Get the performance month
        return performanceMonth === targetMonth; // Compare months
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
