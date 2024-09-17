import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PerformanceService } from '../services/performance.service';
import { loadPerformances, loadPerformancesSuccess, loadPerformancesFailure } from './performance.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class PerformanceEffects {
  constructor(
    private actions$: Actions,
    private performanceService: PerformanceService
  ) {}

  loadPerformances$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPerformances),
      mergeMap(() =>
        this.performanceService.getPerformances().pipe(
          map((performances) => loadPerformancesSuccess({ performances })),
          catchError((error) => of(loadPerformancesFailure({ error })))
        )
      )
    )
  );
}
