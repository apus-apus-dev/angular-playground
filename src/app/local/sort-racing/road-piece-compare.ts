import { RoadPiece } from './road-piece';

export function roadPieceCompareFn(a: RoadPiece, b: RoadPiece): number {
  return a.value.charCodeAt(0)- b.value.charCodeAt(0);
}
