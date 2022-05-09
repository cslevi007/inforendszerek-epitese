import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ExaminationService } from '../services/examination.service';

@Component({
  selector: 'app-regular-examination-form',
  templateUrl: './regular-examination-form.component.html',
  styleUrls: ['./regular-examination-form.component.css']
})
export class RegularExaminationFormComponent implements OnInit {

  examinationForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private examinationService: ExaminationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  get f(): { [key: string]: AbstractControl } {
    return this.examinationForm.controls;
  }

  ngOnInit(): void {

    this.examinationForm = this.formBuilder.group({
      id: [],
      name: ['', Validators.compose([Validators.minLength(3), Validators.required])],
      sex: ['', Validators.required],
      age: ['', Validators.required],
      isAbove: ['', Validators.required],
      interval: ['', Validators.required]
    });
  }

  async addExamination() {
    if (this.examinationForm.controls['isAbove'].value == "true") {
      this.examinationForm.controls['isAbove'].setValue(true)
    }
    else {
      this.examinationForm.controls['isAbove'].setValue(false)
    }

    if (this.examinationForm.controls['sex'].value == "x") {
      this.examinationForm.controls['sex'].setValue("")
    }

    const examination = this.examinationForm.value;
    this.examinationService.addExamination(examination);
    this.router.navigateByUrl('/regular-examination');
  }

}
