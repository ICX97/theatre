import { createAction, props } from '@ngrx/store';
import { Performance } from '../models/performance.model';

// Akcija za pokretanje učitavanja predstava
export const loadPerformances = createAction(
  '[Performance] Load Performances'
);

// Akcija za uspešno učitavanje predstava
export const loadPerformancesSuccess = createAction(
  '[Performance] Load Performances Success',
  props<{ performances: Performance[] }>() // Prop koji sadrži niz predstava
);

// Akcija za grešku prilikom učitavanja predstava
export const loadPerformancesFailure = createAction(
  '[Performance] Load Performances Failure',
  props<{ error: string }>() // Prop koji sadrži poruku o grešci
);