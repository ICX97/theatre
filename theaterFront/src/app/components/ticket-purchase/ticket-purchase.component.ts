import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { PerformanceService } from '../../services/performance.service';
import { Performance } from '../../models/performance.model';

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

  constructor(private router: Router, private performanceService: PerformanceService) {
    this.selectedMonth = this.currentMonth;
  }

  ngOnInit() {
    this.getPerformances();
  }

  getPerformances() {
    this.performanceService.getPerformances().subscribe((data: Performance[]) => {
      this.performances = data;
      this.filterPerformances(); // Filtriraj odmah po mesecu kada dobijemo podatke
    });
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
