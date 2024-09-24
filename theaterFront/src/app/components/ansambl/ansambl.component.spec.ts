import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnsamblComponent } from './ansambl.component';

describe('AnsamblComponent', () => {
  let component: AnsamblComponent;
  let fixture: ComponentFixture<AnsamblComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnsamblComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnsamblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
