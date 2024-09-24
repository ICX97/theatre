import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 


import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module'; 
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { PerformancesComponent } from './components/performances/performances.component';
import { PerformanceDetailComponent } from './components/performance-detail/performance-detail.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { SliderComponent } from './components/slider/slider.component';
import { FooterComponent } from './components/footer/footer.component';
import { UpcomingPerformancesComponent } from './components/upcoming-performances/upcoming-performances.component';
import { NewsComponent } from './components/news/news.component';
import { TheaterInfoComponent } from './components/theater-info/theater-info.component';
import { HistoryComponent } from './components/history/history.component';
import { RepertoarComponent } from './components/repertoar/repertoar.component';
import { AnsamblComponent } from './components/ansambl/ansambl.component';
import { ActorComponent } from './components/actor/actor.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TicketPurchaseComponent } from './components/ticket-purchase/ticket-purchase.component';
import { SeatSelectionComponent } from './components/seat-selection/seat-selection.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PerformancesComponent,
    PerformanceDetailComponent,
    ReservationComponent,
    SliderComponent,
    FooterComponent,
    UpcomingPerformancesComponent,
    NewsComponent,
    TheaterInfoComponent,
    HistoryComponent,
    RepertoarComponent,
    AnsamblComponent,
    ActorComponent,
    LoginComponent,
    RegisterComponent,
    TicketPurchaseComponent,
    SeatSelectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot([])
  ],
  providers: [
    provideHttpClient(withFetch()),  // Omogućeno korišćenje fetch API-a
    provideClientHydration()
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
