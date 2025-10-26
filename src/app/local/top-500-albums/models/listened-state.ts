export interface ListenedState {
  lastListenedRank: number;
  listenedAlbums: number[];
}

export interface ListenedStateByVersion {
  selectedVersion: string;
  versions: {
    [version: string]: ListenedState;
  };
}

export function createEmptyListenedByVersionState(): ListenedStateByVersion {
  return {
    selectedVersion: '',
    versions: {},
  };
}

export function createEmptyListenedState(): ListenedState {
  return {
    lastListenedRank: 500,
    listenedAlbums: [],
  };
}
