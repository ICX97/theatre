import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheaterInfoComponent } from './theater-info.component';

describe('TheaterInfoComponent', () => {
  let component: TheaterInfoComponent;
  let fixture: ComponentFixture<TheaterInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TheaterInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheaterInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
