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
import { TicketPurchaseComponent } from './components/ticket-purchase/ticket-purchase.component';
import { SeatSelectionComponent } from './components/seat-selection/seat-selection.component';

const routes: Routes = [
  { path: '', component: HomeComponent },  // Default route
  { path: 'history', component: HistoryComponent }, 
  { path: 'performances', component: PerformancesComponent },
  { path: 'performance/:id', component: PerformanceDetailComponent },
  { path: 'seat-selection/:id', component: SeatSelectionComponent },
  { path: 'repertoar', component: RepertoarComponent },
  { path: 'ensemble', component: AnsamblComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'buy-ticket/:id', component: TicketPurchaseComponent },
  { path: 'actor/:id', component: ActorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
