import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-resume',
  standalone: true,
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css'],
  imports: [ReactiveFormsModule] // Import ReactiveFormsModule here
})
export class ResumeComponent {
  resumeForm: FormGroup;

  constructor() {
    this.resumeForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      designation: new FormControl(''),
      college: new FormControl(''),
      about: new FormControl(''),
      education: new FormControl(''),
      workExperience: new FormControl(''),
      workshops: new FormControl(''),
    });
  }

  onSubmit() {
    console.log(this.resumeForm.value);
    // Here you can add logic to generate the resume or navigate to a new route
  }
}
