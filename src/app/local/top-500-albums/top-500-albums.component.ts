import { ChangeDetectionStrategy, Component, inject, QueryList, signal, ViewChildren, ElementRef, DestroyRef } from '@angular/core';
import { StateService } from './state-service';
import { filter, switchMap, take, tap } from 'rxjs';
import { Album } from './models/album';
import { createEmptyListenedState, ListenedState } from './models/listened-state';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const enum MusicPlatform {
  YT_MUSIC = 'YT Music',
  APPLE_MUSIC = 'Apple Music',
  SPOTIFY = 'Spotify',
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-top-500-albums',
  imports: [FormsModule],
  templateUrl: './top-500-albums.component.html',
  styleUrl: './top-500-albums.component.scss',
})
export class Top500AlbumsComponent {
  listenedState: ListenedState = createEmptyListenedState();
  availableVersions = signal<string[]>([]);
  selectedVersion = signal<string>('');

  availablePlatforms = signal<string[]>([MusicPlatform.YT_MUSIC, MusicPlatform.APPLE_MUSIC, MusicPlatform.SPOTIFY]);
  selectedPlatform = signal<string>(this.availablePlatforms()[0]);

  descriptionToggleRank = signal<number | null>(null);
  private destroyRef = inject(DestroyRef);

  @ViewChildren('lastListened') lastListenedEls!: QueryList<ElementRef<HTMLElement>>;

  toggleListened(item: any) {
    item.listened = !item.listened;
    this.listenedState.lastListenedRank = item.rank;

    const listenedAlbums = this.listenedState.listenedAlbums || [];
    if (item.listened) {
      listenedAlbums.push(item.rank);
    } else {
      const index = listenedAlbums.indexOf(item.rank);
      if (index > -1) {
        listenedAlbums.splice(index, 1);
      }
    }
    this.listenedState.listenedAlbums = listenedAlbums;
    this.saveListenedState();
  }
  findOnMusicPlatform(item: Album) {
    const text = `${item.artist} ${item.albumTitle}`;
    const query = encodeURIComponent(text);
    let url = '';
    switch (this.selectedPlatform()) {
      case MusicPlatform.YT_MUSIC:
        url = `https://music.youtube.com/search?q=${query}`;
        break;
      case MusicPlatform.APPLE_MUSIC:
        url = `https://music.apple.com/us/search?term=${query}`;
        break;
      case MusicPlatform.SPOTIFY:
        url = `https://open.spotify.com/search/${query}`;
        break;
    }
    window.open(url, '_blank');
  }

  toggleDescription(rank: number) {
    if (this.descriptionToggleRank() === rank) {
      this.descriptionToggleRank.set(null);
    } else {
      this.descriptionToggleRank.set(rank);
    }
  }
  copyToClipboard(item: any) {
    const text = `${item.artist} ${item.albumTitle}`;
    navigator.clipboard.writeText(text);
  }
  albumsService = inject(StateService);
  items = signal<any[]>([]);
  ngOnInit() {
    this.loadAlbums();
  }

  constructor() {}

  loadAlbums() {
    this.albumsService
      .getAvailableVersions()
      .pipe(
        tap(versions => {
          this.availableVersions.set(versions);
          this.selectedVersion.set(versions[0]);
          this.listenedState = this.albumsService.getListenedState(this.selectedVersion());
        }),
        switchMap((versions: string[]) => {
          return this.albumsService.getAlbums(this.selectedVersion());
        }),
      )
      .subscribe((data: Album[]) => {
        const sortedData = data
          .sort((a: any, b: any) => b.rank - a.rank)
          .map((item: any) => {
            return { ...item, id: item.rank + '' };
          });
        // Mark listened albums
        const listenedAlbums = this.listenedState.listenedAlbums || [];
        sortedData.forEach((item: any) => {
          item.listened = listenedAlbums.includes(item.rank);
        });
        this.items.set(sortedData);
      });
  }

  saveListenedState() {
    const stateByVersion = this.albumsService.getListenedStateByVersion();
    stateByVersion.selectedVersion = this.selectedVersion();
    stateByVersion.versions[this.selectedVersion()] = this.listenedState;
    this.albumsService.saveListenedStateByVersion(stateByVersion);
  }

  ngAfterViewInit() {
    // handle the element appearing later (e.g. after data load or state change)
    this.lastListenedEls.changes
      .pipe(
        filter(() => !!this.getLastListenedHtmlElement()),
        take(1),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.scrollToLastListened());
    // attempt an initial scroll in case it's already present
    this.scrollToLastListened();
  }

  private getLastListenedHtmlElement() {
    const el = this.lastListenedEls.first;
    console.log('Last listened element:', el);
    return el?.nativeElement;
  }

  private scrollToLastListened() {
    this.getLastListenedHtmlElement().scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}
