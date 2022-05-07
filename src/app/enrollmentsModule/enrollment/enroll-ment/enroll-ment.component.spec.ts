import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollMentComponent } from './enroll-ment.component';

describe('EnrollMentComponent', () => {
  let component: EnrollMentComponent;
  let fixture: ComponentFixture<EnrollMentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrollMentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollMentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
