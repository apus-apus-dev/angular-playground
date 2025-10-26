import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataProvider } from 'src/app/data/data.provider';
import {
  createEmptyListenedByVersionState,
  createEmptyListenedState,
  ListenedState,
  ListenedStateByVersion,
} from './models/listened-state';
import { Album } from './models/album';

const localStorageKey = 'top-500-albums';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private dataProvider = inject(DataProvider);
  private availableVersions: string[] = [];

  getAvailableVersions(): Observable<string[]> {
    return this.dataProvider.getData('top-500-albums/versions.json');
  }

  getAlbums(version: string): Observable<Album[]> {
    return this.dataProvider.getData(`top-500-albums/${version}.json`);
  }

  getListenedStateByVersion(): ListenedStateByVersion {
    const data = localStorage.getItem(localStorageKey);

    return data ? JSON.parse(data) : createEmptyListenedByVersionState();
  }

  getListenedState(selectedVersion: string): ListenedState {
    const stateByVersion = this.getListenedStateByVersion();

    return stateByVersion.versions[selectedVersion] || createEmptyListenedState();
  }

  saveListenedStateByVersion(state: ListenedStateByVersion) {
    localStorage.setItem(localStorageKey, JSON.stringify(state));
  }
}
