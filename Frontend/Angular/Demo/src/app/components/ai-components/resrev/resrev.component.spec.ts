import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResrevComponent } from './resrev.component';

describe('ResrevComponent', () => {
  let component: ResrevComponent;
  let fixture: ComponentFixture<ResrevComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResrevComponent]
    });
    fixture = TestBed.createComponent(ResrevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
