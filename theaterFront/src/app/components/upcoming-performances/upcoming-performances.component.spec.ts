import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingPerformancesComponent } from './upcoming-performances.component';

describe('UpcomingPerformancesComponent', () => {
  let component: UpcomingPerformancesComponent;
  let fixture: ComponentFixture<UpcomingPerformancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpcomingPerformancesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpcomingPerformancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
