import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmoduleContainerComponent } from './submodule-container.component';

describe('SubmoduleContainerComponent', () => {
  let component: SubmoduleContainerComponent;
  let fixture: ComponentFixture<SubmoduleContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubmoduleContainerComponent]
    });
    fixture = TestBed.createComponent(SubmoduleContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
