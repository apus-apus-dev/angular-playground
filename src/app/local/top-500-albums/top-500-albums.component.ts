import { Component, inject, signal, Signal } from '@angular/core';
import { DataProvider } from 'src/app/data/data.provider';

@Component({
  selector: 'app-top-500-albums',
  imports: [],
  templateUrl: './top-500-albums.component.html',
  styleUrl: './top-500-albums.component.scss',
})
export class Top500AlbumsComponent {
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
      this.items.set(data);
    });
  }
}
