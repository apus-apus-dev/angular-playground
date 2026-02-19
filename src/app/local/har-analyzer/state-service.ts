import { Injectable } from '@angular/core';
import {
  createEmptyHarAnalyzerState,
  HarAnalyzerState,
} from './models/har-analyzer-state';

const localStorageKey = 'har-analyzer';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  getHarAnalyzerState(): HarAnalyzerState {
    const data = localStorage.getItem(localStorageKey);

    return data ? JSON.parse(data) : createEmptyHarAnalyzerState();
  }

  saveHarAnalyzerState(state: HarAnalyzerState) {
    localStorage.setItem(localStorageKey, JSON.stringify(state));
  }
}
