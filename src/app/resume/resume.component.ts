import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css'],
})
export class ResumeComponent {
  resumeform: FormGroup;

  constructor(private fb: FormBuilder) {
    this.resumeform = this.fb.group({
      name: [''],
      email: [''],
      designation: [''],
      college: [''],
      about: [''],
      education: [''],
      workExperience: [''],
      workshops: [''],
    });
  }

  onSubmit() {
    console.log(this.resumeform.value);
    // You can process the form data here
  }
}
