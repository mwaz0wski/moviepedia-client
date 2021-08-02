import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieQueryComponent } from './movie-query.component';

describe('MovieQueryComponent', () => {
  let component: MovieQueryComponent;
  let fixture: ComponentFixture<MovieQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieQueryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
