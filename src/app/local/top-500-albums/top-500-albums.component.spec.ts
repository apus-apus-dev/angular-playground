import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Top500AlbumsComponent } from './top-500-albums.component';

describe('Top500AlbumsComponent', () => {
  let component: Top500AlbumsComponent;
  let fixture: ComponentFixture<Top500AlbumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Top500AlbumsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Top500AlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
