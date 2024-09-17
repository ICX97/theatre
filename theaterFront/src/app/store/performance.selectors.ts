import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PerformanceState } from './performance.reducer';

// Selektor za performance feature state
export const selectPerformanceState = createFeatureSelector<PerformanceState>('performance');

// Selektor za niz predstava
export const selectPerformances = createSelector(
  selectPerformanceState,
  (state: PerformanceState) => state.performances
);

// Selektor za status učitavanja
export const selectLoading = createSelector(
  selectPerformanceState,
  (state: PerformanceState) => state.loading
);

// Selektor za greške
export const selectError = createSelector(
  selectPerformanceState,
  (state: PerformanceState) => state.error
);
