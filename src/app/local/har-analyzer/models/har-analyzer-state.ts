export interface HarAnalyzerState {
  expandedDomain: string | null;
}

export function createEmptyHarAnalyzerState(): HarAnalyzerState {
  return {
    expandedDomain: null,
  };
}
