import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PerformancesComponent } from './components/performances/performances.component';
import { HistoryComponent } from './components/history/history.component';
import { RepertoarComponent } from './components/repertoar/repertoar.component';
import { PerformanceDetailComponent } from './components/performance-detail/performance-detail.component';
import { AnsamblComponent } from './components/ansambl/ansambl.component';
import { ActorComponent } from './components/actor/actor.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NewsComponent } from './components/news/news.component';
import { TicketPurchaseComponent } from './components/ticket-purchase/ticket-purchase.component';
import { SeatSelectionComponent } from './components/seat-selection/seat-selection.component';
import { SingleNewsComponent } from './components/single-news/single-news.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';


const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'history', component: HistoryComponent }, 
  { path: 'performances', component: PerformancesComponent },
  { path: 'news', component: NewsComponent },
  { path: 'performance/:id', component: PerformanceDetailComponent },
  { path: 'seat-selection/:id', component: SeatSelectionComponent },
  { path: 'repertoar', component: RepertoarComponent },
  { path: 'ensemble', component: AnsamblComponent },
  { path: 'login', component: LoginComponent },
  { path: 'single-news/:newsId', component: SingleNewsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'buy-ticket/:id', component: TicketPurchaseComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'actor/:id', component: ActorComponent },
  { path: 'verify-email', component: EmailVerificationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
