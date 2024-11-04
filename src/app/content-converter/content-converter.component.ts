import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPhoneAlt,faEnvelope } from '@fortawesome/free-solid-svg-icons';
import html2pdf from 'html2pdf.js';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-content-converter',
  standalone: true,
  templateUrl: './content-converter.component.html',
  styleUrl: './content-converter.component.css',
  imports: [FontAwesomeModule,CommonModule]
})

export class ContentConverterComponent {
 
  faTeletype = faPhoneAlt;
  faEnvelope = faEnvelope;
  
  currentDate: Date = new Date();
  @Input() resumeForm: any; // Change 'any' to the specific type if available
  @Input() selectedFile: File | null = null; // To receive selected file
  constructor(private fb: FormBuilder) {
    this.resumeForm = this.fb.group({
      name: [''],
      birthDate: [''],
      Address: [''],
      familyStatus: [''],
      email: [''],
      phone: [''],
      nationality: [''],
      EDV: [''],
      my_strong: [''],
  
      // Dynamic fields as FormArrays
      languages: this.fb.array([]),
      workExperience: this.fb.array([]),
      workshops: this.fb.array([]),
      school: this.fb.array([]),
    });
  }
  get imageUrl(): string | null {
    return this.selectedFile ? URL.createObjectURL(this.selectedFile) : null;
  }
  ngOnInit() {
    const savedData = localStorage.getItem('resumeFormData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      this.resumeForm.patchValue(parsedData);

      // Populate FormArray fields
      this.populateFormArray('languages', parsedData.languages);
      this.populateFormArray('workExperience', parsedData.workExperience);
      this.populateFormArray('workshops', parsedData.workshops);
      this.populateFormArray('school', parsedData.school);
    }
  }

  private populateFormArray(arrayName: string, dataArray: any[]) {
    const formArray = this.resumeForm.get(arrayName) as FormArray;
    formArray.clear(); // Clear any existing controls

    dataArray.forEach(item => {
      const group = this.fb.group(item);
      formArray.push(group);
    });
  }

  


  saveAsPDF() {
    const element = document.getElementById('contentToConvert');

    if (element) {
      const options = {
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: {
          scale: 2,
          background: '#ffffff',
        },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      html2pdf().from(element).set(options).save();
    } else {
      console.error("Element not found!");
    }
  }

  createImageUrl(file: File): string {
    return URL.createObjectURL(file);
  }}