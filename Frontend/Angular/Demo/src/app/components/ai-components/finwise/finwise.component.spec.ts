import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinwiseComponent } from './finwise.component';

describe('FinbotComponent', () => {
  let component: FinwiseComponent;
  let fixture: ComponentFixture<FinwiseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinwiseComponent]
    });
    fixture = TestBed.createComponent(FinwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
