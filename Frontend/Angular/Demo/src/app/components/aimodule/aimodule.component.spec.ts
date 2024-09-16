import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AimoduleComponent } from './aimodule.component';

describe('AimoduleComponent', () => {
  let component: AimoduleComponent;
  let fixture: ComponentFixture<AimoduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AimoduleComponent]
    });
    fixture = TestBed.createComponent(AimoduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
