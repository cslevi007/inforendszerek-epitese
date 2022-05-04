import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularExaminationComponent } from './regular-examination.component';

describe('RegularExaminationComponent', () => {
  let component: RegularExaminationComponent;
  let fixture: ComponentFixture<RegularExaminationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegularExaminationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
