import { Component, OnInit } from '@angular/core';
import { PerformanceService } from '../../services/performance.service'; // Import the service
import { Performance } from '../../models/performance.model';

@Component({
  selector: 'app-repertoar',
  templateUrl: './repertoar.component.html',
  styleUrls: ['./repertoar.component.css']
})
export class RepertoarComponent implements OnInit {
  months: string[] = [];
  selectedMonth: string = '';
  performances: Performance[] = [];
  filteredPerformances: Performance[] = []; // Dodato za filtrirane predstave

  constructor(private performanceService: PerformanceService) {}

  ngOnInit() {
    this.setMonths();
    this.selectedMonth = this.months[1];  // Automatski postavi trenutni mesec
    this.getPerformances();
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

  getPerformances() {
    this.performanceService.getPerformances().subscribe((data: Performance[]) => {
      this.performances = data;
      this.filterPerformancesByMonth(); // Filtriraj po mesecu kada dobijemo podatke
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
}

}
