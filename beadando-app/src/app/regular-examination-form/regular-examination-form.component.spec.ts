import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularExaminationFormComponent } from './regular-examination-form.component';

describe('RegularExaminationFormComponent', () => {
  let component: RegularExaminationFormComponent;
  let fixture: ComponentFixture<RegularExaminationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegularExaminationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularExaminationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
