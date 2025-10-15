import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { SingleNewsComponent } from './components/single-news/single-news.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewsService } from './services/news.service';
import { PerformanceService } from './services/performance.service';
import { EnsembleService } from './services/ensemble.service';
import { PaymentService } from './services/payment.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MultiSelectModule } from 'primeng/multiselect';
import { NewsModalComponent } from './components/news-modal/news-modal.component';
import { ActorModalComponent } from './components/actor-modal/actor-modal.component';
import { PerformanceModalComponent } from './components/performance-modal/performance-modal.component';
import { AuthModalComponent } from './components/auth-modal/auth-modal.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';

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
    SeatSelectionComponent,
    SingleNewsComponent,
    DashboardComponent,
    NewsModalComponent,
    ActorModalComponent,
    PerformanceModalComponent,
    AuthModalComponent,
    EmailVerificationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MultiSelectModule,
    RouterModule.forRoot([])
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideClientHydration(),
    NewsService,
    PerformanceService,
    EnsembleService,
    PaymentService,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
