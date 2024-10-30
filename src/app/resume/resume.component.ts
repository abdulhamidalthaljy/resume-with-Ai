import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPhoneAlt,faEnvelope } from '@fortawesome/free-solid-svg-icons';
import html2pdf from 'html2pdf.js';
@Component({
  selector: 'app-resume',
  standalone: true,
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css'],
  imports: [ReactiveFormsModule, CommonModule,FontAwesomeModule]
})
export class ResumeComponent {
  faTeletype = faPhoneAlt;
  faEnvelope = faEnvelope;
  resumeForm: FormGroup;
  selectedFile: File | null = null;

  constructor() {
    this.resumeForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),

      designation: new FormControl(''),
      college: new FormControl(''),
      about: new FormControl(''),
      education: new FormControl(''),
      workExperience: new FormControl(''),
      workshops: new FormControl(''),
      photo: new FormControl(''),
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
          background: '#ffffff', // Set a white background
        },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
  
      // Use html2pdf to create the PDF
      html2pdf().from(element).set(options).save();
    } else {
      console.error("Element not found!");
    }
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
