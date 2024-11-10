import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { PerformanceService } from '../../services/performance.service';
import { Performance } from '../../models/performance.model';
import { TicketPriceService } from '../../services/ticket-price.service';
import { PerformanceTicketPrice } from '../../models/performance-ticket-price.model';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-ticket-purchase',
  templateUrl: './ticket-purchase.component.html',
  styleUrls: ['./ticket-purchase.component.css']
})
export class TicketPurchaseComponent implements OnInit {
  performances: Performance[] = [];
  filteredPerformances: Performance[] = [];
  selectedMonth: string;
  currentMonth: string = formatDate(new Date(), 'yyyy-MM', 'en');
  nextMonth: string = formatDate(new Date(new Date().setMonth(new Date().getMonth() + 1)), 'yyyy-MM', 'en');
  ticketPrices: { [performanceId: number]: { [seatType: string]: number } } = {};

  constructor(private router: Router, private performanceService: PerformanceService, private ticketPriceService: TicketPriceService) {
    this.selectedMonth = this.currentMonth;
  }

  ngOnInit() {
    this.getPerformances();
  }

  getPerformances() {
    this.performanceService.getPerformances().subscribe((data: Performance[]) => {
      this.performances = data;
      this.filterPerformances();
      this.loadTicketPrices(); // Filtriraj odmah po mesecu kada dobijemo podatke
    });
  }

  loadTicketPrices() {
    const priceRequests = this.performances.map(performance => {
      return this.ticketPriceService.getTicketPricesByPerformance(performance.performanceId).pipe(
        map((prices: PerformanceTicketPrice[]) => {
          this.ticketPrices[performance.performanceId] = this.groupPricesBySeatType(prices);
        })
      );
    });

    
    forkJoin(priceRequests).subscribe(() => {
      
      this.filterPerformances();
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
    return seatTypeMap[seatTypeId] || '';
  }

  filterPerformances() {
    this.filteredPerformances = this.performances.filter(performance =>
      formatDate(performance.performance_date, 'yyyy-MM', 'en') === this.selectedMonth
    );
  }

  changeMonth(month: string) {
    this.selectedMonth = month;
    this.filterPerformances();
  }

  purchaseTickets(performanceId: number) {
    this.router.navigate(['/seat-selection', performanceId]);
  }
}
