import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resume',
  standalone: true,
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class ResumeComponent {
  resumeForm: FormGroup;
  selectedFile: File | null = null;

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
      photo: new FormControl(''),
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
      this.resumeForm.patchValue({
        photo: this.selectedFile.name
      });
    }
  }

  createImageUrl(file: File): string {
    return URL.createObjectURL(file);
  }

  onSubmit() {
    console.log(this.resumeForm.value);
  }
}
