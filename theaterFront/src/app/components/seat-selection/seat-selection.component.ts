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

// Definišemo dozvoljene tipove sedišta
type SeatTypeName = 'PARTER' | 'BALKON' | 'LOZA';

interface SeatDisplay {
  seatId: number;
  seatNumber: string;
  rowNum: number;
  side: 'LEFT' | 'RIGHT';
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
  userId: number=0; //u konstrukotoru;

  /*
  performanceId: number;
  userId: number; // Pretpostavljam da imaš način da dobiješ ID korisnika
  selectedSeatId: number; // ID izabranog sedišta

  constructor(private route: ActivatedRoute, private reservationService: ReservationService) {
    this.performanceId = +this.route.snapshot.paramMap.get('id'); // Uzmi ID predstave iz URL-a
    this.userId = /* dobavi userId iz autentifikacije ili nekog servisa ;
  }
   */
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
    private reservationService: ReservationService
  ) {
    this.userId = /* dobavi userId iz autentifikacije ili nekog servisa */ 0;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.performanceId = id ? Number(id) : 0;
    this.loadSeats();
    this.loadData();
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
        side: seat.side,
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

    
  
    // Sort seats within each row by side and seat number
    Object.keys(tempSeatsByType).forEach(type => {
      tempSeatsByType[type] = tempSeatsByType[type].map(row => 
        row.sort((a, b) => {
          if (a.side === b.side) {
            return a.seatNumber.localeCompare(b.seatNumber);
          }
          return a.side === 'LEFT' ? -1 : 1;
        })
      );
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

  toggleSeatSelection(seat: SeatDisplay, section: string, side?: string): void {
    if (seat.isReserved) return;

    if (section === 'LOZA') {
      if (side === 'left') {
        this.clearSelectedSeats('LOZA', 'left');
      } else if (side === 'right') {
        this.clearSelectedSeats('LOZA', 'right');
      }
    }

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

  clearSelectedSeats(section: string, side: string) {
    const seats = this.seatsByType[section];
    seats.forEach(row => {
      row.forEach(seat => {
        if (side === 'left' && seat.side === 'LEFT' && seat.isSelected) {
          seat.isSelected = false;
        } else if (side === 'right' && seat.side === 'RIGHT' && seat.isSelected) {
          seat.isSelected = false;
        }
      });
    });
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
        seatId: selectedSeats.map(seat => seat.seatId), 
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