import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  Signal,
} from '@angular/core';
import { DataProvider } from 'src/app/data/data.provider';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-top-500-albums',
  imports: [],
  templateUrl: './top-500-albums.component.html',
  styleUrl: './top-500-albums.component.scss',
})
export class Top500AlbumsComponent {
  toggleListened(item: any) {
    item.listened = !item.listened;
    // Save to localStorage
    const listenedAlbums = JSON.parse(
      localStorage.getItem('listenedAlbums') || '[]'
    );
    if (item.listened) {
      listenedAlbums.push(item.rank);
    } else {
      const index = listenedAlbums.indexOf(item.rank);
      if (index > -1) {
        listenedAlbums.splice(index, 1);
      }
    }
    localStorage.setItem('listenedAlbums', JSON.stringify(listenedAlbums));
  }
  findOnYTMusic(item: any) {
    const text = `${item.artist} ${item.albumTitle}`;
    const query = encodeURIComponent(text);
    const url = `https://music.youtube.com/search?q=${query}`;
    window.open(url, '_blank');
  }
  copyToClipboard(item: any) {
    const text = `${item.artist} ${item.albumTitle}`;
    navigator.clipboard.writeText(text);
  }
  dataProvider = inject(DataProvider);
  items = signal<any[]>([]);
  ngOnInit() {
    this.loadAlbums();
  }

  constructor() {}

  loadAlbums() {
    this.dataProvider.getAlbums().subscribe((data: any) => {
      const sortedData = data.sort((a: any, b: any) => b.rank - a.rank);
      // Mark listened albums
      const listenedAlbums = JSON.parse(
        localStorage.getItem('listenedAlbums') || '[]'
      );
      sortedData.forEach((item: any) => {
        item.listened = listenedAlbums.includes(item.rank);
      });
      this.items.set(data);
    });
  }
}
