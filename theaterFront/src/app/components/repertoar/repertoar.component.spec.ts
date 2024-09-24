import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepertoarComponent } from './repertoar.component';

describe('RepertoarComponent', () => {
  let component: RepertoarComponent;
  let fixture: ComponentFixture<RepertoarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RepertoarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepertoarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
