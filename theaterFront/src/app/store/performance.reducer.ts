import { createReducer, on } from '@ngrx/store';
import { loadPerformances, loadPerformancesSuccess, loadPerformancesFailure } from './performance.actions';
import { Performance } from '../models/performance.model';

export interface PerformanceState {
  performances: Performance[];   // Niz predstava
  error: string | null;          // Poruka o grešci, ako je ima
  loading: boolean;              // Status učitavanja
}

export const initialState: PerformanceState = {
  performances: [],
  error: null,
  loading: false
};

export const performanceReducer = createReducer(
  initialState,
  on(loadPerformances, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(loadPerformancesSuccess, (state, { performances }) => ({
    ...state,
    performances,
    loading: false
  })),
  on(loadPerformancesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);