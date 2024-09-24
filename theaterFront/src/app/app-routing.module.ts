import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PerformancesComponent } from './components/performances/performances.component';
import { HistoryComponent } from './components/history/history.component';
import { RepertoarComponent } from './components/repertoar/repertoar.component';
import { PerformanceDetailComponent } from './components/performance-detail/performance-detail.component';
import { AnsamblComponent } from './components/ansambl/ansambl.component';


const routes: Routes = [
  { path: '', component: HomeComponent },  // Default route
  { path: 'history', component: HistoryComponent }, 
  { path: 'performances', component: PerformancesComponent },
  { path: 'performance/:id', component: PerformanceDetailComponent },
  { path: 'repertoar', component: RepertoarComponent },
  { path: 'ensemble', component: AnsamblComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
