import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

interface Performance {
  id: number;
  title: string;
  date: string;
  time: string;
  availableTickets: number;
}

@Component({
  selector: 'app-ticket-purchase',
  templateUrl: './ticket-purchase.component.html',
  styleUrls: ['./ticket-purchase.component.css']
})
export class TicketPurchaseComponent {
  performances: Performance[] = [
    { id: 1, title: 'Predstava 1', date: '2024-09-25', time: '20:00', availableTickets: 50 },
    { id: 2, title: 'Predstava 2', date: '2024-09-27', time: '19:00', availableTickets: 30 },
    { id: 3, title: 'Predstava 3', date: '2024-10-01', time: '18:00', availableTickets: 100 },
    { id: 4, title: 'Predstava 4', date: '2024-10-10', time: '20:00', availableTickets: 25 }
  ];
  
  filteredPerformances: Performance[] = [];
  selectedMonth: string;
  currentMonth: string = formatDate(new Date(), 'yyyy-MM', 'en');
  nextMonth: string = formatDate(new Date(new Date().setMonth(new Date().getMonth() + 1)), 'yyyy-MM', 'en');

  constructor(private router: Router) {
    this.selectedMonth = this.currentMonth;
    this.filterPerformances();
  }

  filterPerformances() {
    this.filteredPerformances = this.performances.filter(performance =>
      performance.date.startsWith(this.selectedMonth)
    );
  }

  changeMonth(month: string) {
    this.selectedMonth = month;
    this.filterPerformances();
  }

  purchaseTickets(performanceId: number) {
    // Rutiranje ka stranici za kupovinu ulaznica za određenu predstavu
    this.router.navigate(['/seat-selection', performanceId]);
  }
}
