import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IprepComponent } from './iprep.component';

describe('IprepComponent', () => {
  let component: IprepComponent;
  let fixture: ComponentFixture<IprepComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IprepComponent]
    });
    fixture = TestBed.createComponent(IprepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
