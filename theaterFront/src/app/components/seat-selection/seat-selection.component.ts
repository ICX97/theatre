import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../services/payment.service';

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

  lozaSeats: Seat[] = [
    { id: 1, type: 'loza', isSelected: false, price: 5000 },
    { id: 2, type: 'loza', isSelected: false, price: 5000 },
    { id: 3, type: 'loza', isSelected: false, price: 5000 },
    { id: 4, type: 'loza', isSelected: false, price: 5000 },
    { id: 5, type: 'loza', isSelected: false, price: 5000 },
    { id: 6, type: 'loza', isSelected: false, price: 5000 },
    { id: 7, type: 'loza', isSelected: false, price: 5000 },
    { id: 8, type: 'loza', isSelected: false, price: 5000 },
    { id: 9, type: 'loza', isSelected: false, price: 5000 },
    { id: 10, type: 'loza', isSelected: false, price: 5000 },
];

parterSeats: Seat[] = [
    { id: 1, type: 'parter', isSelected: false, price: 3000 },
    { id: 2, type: 'parter', isSelected: false, price: 3000 },
    { id: 3, type: 'parter', isSelected: false, price: 3000 },
    { id: 4, type: 'parter', isSelected: false, price: 3000 },
    { id: 5, type: 'parter', isSelected: false, price: 3000 },
    { id: 6, type: 'parter', isSelected: false, price: 3000 },
    { id: 7, type: 'parter', isSelected: false, price: 3000 },
    { id: 8, type: 'parter', isSelected: false, price: 3000 },
    { id: 9, type: 'parter', isSelected: false, price: 3000 },
    { id: 10, type: 'parter', isSelected: false, price: 3000 },
    { id: 11, type: 'parter', isSelected: false, price: 3000 },
    { id: 12, type: 'parter', isSelected: false, price: 3000 },
    { id: 13, type: 'parter', isSelected: false, price: 3000 },
    { id: 14, type: 'parter', isSelected: false, price: 3000 },
    { id: 15, type: 'parter', isSelected: false, price: 3000 },
    { id: 16, type: 'parter', isSelected: false, price: 3000 },
    { id: 17, type: 'parter', isSelected: false, price: 3000 },
    { id: 18, type: 'parter', isSelected: false, price: 3000 },
    { id: 19, type: 'parter', isSelected: false, price: 3000 },
    { id: 20, type: 'parter', isSelected: false, price: 3000 },
];

balkonSeats: Seat[] = [
    { id: 1, type: 'balkon', isSelected: false, price: 2000 },
    { id: 2, type: 'balkon', isSelected: false, price: 2000 },
    { id: 3, type: 'balkon', isSelected: false, price: 2000 },
    { id: 4, type: 'balkon', isSelected: false, price: 2000 },
    { id: 5, type: 'balkon', isSelected: false, price: 2000 },
    { id: 6, type: 'balkon', isSelected: false, price: 2000 },
    { id: 7, type: 'balkon', isSelected: false, price: 2000 },
    { id: 8, type: 'balkon', isSelected: false, price: 2000 },
    { id: 9, type: 'balkon', isSelected: false, price: 2000 },
    { id: 10, type: 'balkon', isSelected: false, price: 2000 },
];


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

  constructor(private route: ActivatedRoute, private paymentService: PaymentService) {}

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
    const finalPrice = this.selectedSeats.totalPrice * 100;
    this.paymentService.pay(finalPrice, 'rsd', 'Kupovina karte');
  }

}
