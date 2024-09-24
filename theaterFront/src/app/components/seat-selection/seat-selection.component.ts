import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Seat {
  type: 'loza' | 'parter' | 'balkon';
  id: number;
  price: number;
  isSelected: boolean;
}

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css']
})
export class SeatSelectionComponent implements OnInit {
  performanceId: number | null = null;

  seats: Seat[] = [
    { type: 'loza', id: 1, price: 2000, isSelected: false },
    { type: 'parter', id: 2, price: 1500, isSelected: false },
    { type: 'balkon', id: 3, price: 1000, isSelected: false },
  ];

  selectedSeats = {
    loza: 0,
    parter: 0,
    balkon: 0,
    totalPrice: 0
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.performanceId = +(this.route.snapshot.paramMap.get('id') ?? 0); // Rešava problem sa null vrednošću
  }

  toggleSeatSelection(seat: Seat) {
    seat.isSelected = !seat.isSelected;

    if (seat.isSelected) {
      this.selectedSeats[seat.type]++;
      this.selectedSeats.totalPrice += seat.price;
    } else {
      this.selectedSeats[seat.type]--;
      this.selectedSeats.totalPrice -= seat.price;
    }
  }

  confirmReservation() {
    alert("Rezervisali ste sedišta!");
  }
}
