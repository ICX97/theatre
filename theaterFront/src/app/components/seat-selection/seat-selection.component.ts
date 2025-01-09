import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeatService } from '../../services/seat.service';
import { PaymentService } from '../../services/payment.service';
import { Seat } from '../../models/seat.model';
import { SeatType } from '../../models/seat-type.model';
import { PerformanceTicketPrice } from '../../models/performance-ticket-price.model';
import { TicketPriceService } from '../../services/ticket-price.service';
import { ReservationService } from '../../services/reservation.service';
import { ReservationDTO } from '../../dto/ReservationDto';
import { AuthService } from '../../services/auth.service';
import { jwtDecode } from "jwt-decode";

// Definišemo dozvoljene tipove sedišta
type SeatTypeName = 'PARTER' | 'BALKON' | 'LOZA';

interface SeatDisplay {
  seatId: number;
  seatNumber: string;
  rowNum: number;
  isReserved: boolean;
  isSelected: boolean;
  price: number;
  seatTypeId: number;
}

interface SeatsByType {
  [key: string]: SeatDisplay[][];
}

interface SelectedSeats {
  [key: string]: number;
  totalPrice: number;
}

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css']
})
export class SeatSelectionComponent implements OnInit {
  performanceId: number = 0;
  userId: number=6;
  ticketPrices: PerformanceTicketPrice[] = [];
  seatsByType: SeatsByType = {
    'PARTER': [],
    'BALKON': [],
    'LOZA': []
  };
  
  selectedSeats: SelectedSeats = {
    'LOZA': 0,
    'PARTER': 0,
    'BALKON': 0,
    totalPrice: 0
  };

  constructor(
    private route: ActivatedRoute,
    private seatService: SeatService,
    private paymentService: PaymentService,
    @Inject(TicketPriceService) private ticketPriceService: TicketPriceService,
    private reservationService: ReservationService,
    authService: AuthService
  ) {
    //this.userId = /* dobavi userId iz autentifikacije ili nekog servisa */ 6;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.performanceId = id ? Number(id) : 0;
    this.loadSeats();
    this.loadData();
    this.loadId();
    this.loadReservations();
  }

  loadReservations(): void {
    this.reservationService.getReservationsByPerformance(this.performanceId).subscribe(
        (reservations: ReservationDTO[]) => {
            this.handleReservations(reservations);
        },
        error => {
            console.error('Failed to load reservations', error);
        }
    );
  }

  handleReservations(reservations: ReservationDTO | ReservationDTO[]): void {
    if (!Array.isArray(reservations)) {
        // Ako je pojedinačan objekat, stavite ga u niz
        reservations = [reservations];
    }

    reservations.forEach(reservation => {
        console.log('Processing reservation:', reservation);
        reservation.seatIds.forEach(seatId => {
            const seat = this.findSeatById(seatId);
            if (seat) {
                console.log(`Marking seat with ID ${seatId} as reserved`);
                seat.isReserved = true;
            } else {
                console.warn(`Seat with ID ${seatId} not found`);
            }
        });
    });

    console.log('Seats updated:', this.seatsByType);
  }




  findSeatById(seatId: number): SeatDisplay | undefined {
    console.log(`Searching for seat with ID: ${seatId}`);
    console.log('Current seatsByType structure:', this.seatsByType);

    for (const type in this.seatsByType) {
        console.log(`Checking type: ${type}`);
        if (!Array.isArray(this.seatsByType[type])) {
            console.warn(`Type ${type} is not an array or is undefined. Skipping...`);
            continue;
        }

        for (const row of this.seatsByType[type]) {
            if (!Array.isArray(row)) {
                console.warn(`Row in type ${type} is not an array. Skipping...`);
                continue;
            }
            console.log(`Checking row:`, row);

            const seat = row.find(s => s.seatId === seatId);
            if (seat) {
                console.log(`Found seat with ID: ${seatId}`);
                return seat;
            }
        }
    }
    console.warn(`Seat with ID ${seatId} not found in any type`);
    return undefined;
}

  loadId() {
    const token = localStorage.getItem('token'); // Pretpostavljamo da je token sačuvan u localStorage
    if (token) {
      const decoded: any = jwtDecode(token);
      if (decoded.userId) {
        this.userId = decoded.userId;
      } else {
        console.error("UserId is missing from token");
      }
    }
  }

  loadData(): void {
    this.ticketPriceService.getTicketPricesByPerformance(this.performanceId).subscribe(
      (prices: PerformanceTicketPrice[]) => {
        this.ticketPrices = prices;
        this.loadSeats();
      }
    );
  }

  loadSeats(): void {
    this.seatService.getSeatsByPerformance(this.performanceId).subscribe(
      (seats: Seat[]) => {
        this.organizeSeatsByType(seats);
        this.loadReservations();
      }
    );
  }

  getPrice(seatTypeId: number): number {
    const priceInfo = this.ticketPrices.find(p => p.seatTypeId === seatTypeId);
    return priceInfo ? priceInfo.price : 0;
  }

  

  organizeSeatsByType(seats: Seat[]): void {
    const tempSeatsByType: SeatsByType = {};
  
    seats.forEach(seat => {
      const seatDisplay: SeatDisplay = {
        seatId: seat.seatId,
        seatNumber: seat.seatNumber,
        rowNum: seat.rowNum,
        isReserved: seat.isReserved,
        isSelected: false,
        price: this.getPrice(seat.seatTypeId),
        seatTypeId: seat.seatTypeId
      };
  
      const seatTypeName = this.getSeatTypeName(seat.seatTypeId);
      if (seatTypeName) {
        if (!tempSeatsByType[seatTypeName]) {
          tempSeatsByType[seatTypeName] = [];
        }
  
        if (!tempSeatsByType[seatTypeName][seat.rowNum]) {
          tempSeatsByType[seatTypeName][seat.rowNum] = [];
        }
  
        tempSeatsByType[seatTypeName][seat.rowNum].push(seatDisplay);
      }
    });
  
    this.seatsByType = tempSeatsByType;
  }

  getSeatTypeName (seatTypeId: number): SeatTypeName | null {
    const seatTypeMap: { [key: number]: SeatTypeName } = {
      1: 'PARTER',
      2: 'BALKON',
      3: 'LOZA'
    };
    return seatTypeMap[seatTypeId] || null;
  }

  toggleSeatSelection(seat: SeatDisplay, section: string): void {
    if (seat.isReserved) return;
    seat.isSelected = !seat.isSelected;
    this.updateSelectedSeats();
  }

  getPriceForSection(section: SeatTypeName): number {
    const seatType = this.ticketPrices.find(price => price.seatTypeId === this.getSeatTypeId(section));
    return seatType ? seatType.price : 0;
  }

  getSeatTypeId(section: SeatTypeName): number {
    const seatTypeMap: { [key: string]: number } = {
      'PARTER': 1,
      'BALKON': 2,
      'LOZA': 3
    };
    return seatTypeMap[section] || 0;
  }

  updateSelectedSeats() {
    this.selectedSeats['LOZA'] = this.calculateSelectedSeats('LOZA');
    this.selectedSeats.totalPrice = this.calculateTotalPrice();
  }

  calculateSelectedSeats(section: string): number {
    return Object.values(this.seatsByType[section])
      .flat()
      .filter(seat => seat.isSelected).length;
  }

  calculateTotalPrice(): number {
    return Object.values(this.seatsByType).flat(2)
      .filter(seat => seat.isSelected)
      .reduce((total, seat) => total + seat.price, 0);
  }

  confirmReservation(): void {
    const selectedSeats = Object.values(this.seatsByType)
      .flat(2)
      .filter(seat => seat.isSelected);
  
    if (selectedSeats.length > 0) {
      const reservation: ReservationDTO = {
        userId: this.userId, 
        performanceId: this.performanceId,
        seatIds: selectedSeats.map(seat => seat.seatId), 
        reservationDate: new Date() 
      };
  
      this.reservationService.createReservation(reservation).subscribe(response => {
        console.log('Reservation successful:', response);
      }, error => {
        console.error('Reservation failed:', error);
      });
    } else {
      console.warn('No seats selected for reservation.');
    }
  }
}