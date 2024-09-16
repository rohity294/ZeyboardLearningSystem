import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechToTextCapturerComponent } from './speech-to-text-capturer.component';

describe('SpeechToTextCapturerComponent', () => {
  let component: SpeechToTextCapturerComponent;
  let fixture: ComponentFixture<SpeechToTextCapturerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpeechToTextCapturerComponent]
    });
    fixture = TestBed.createComponent(SpeechToTextCapturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
