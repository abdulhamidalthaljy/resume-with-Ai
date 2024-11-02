import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPhoneAlt,faEnvelope } from '@fortawesome/free-solid-svg-icons';
import html2pdf from 'html2pdf.js';
import { NgxPrintModule } from 'ngx-print';
import { GeminiService } from '../gemini.service';
@Component({
  selector: 'app-resume',
  standalone: true,
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css'],
  imports: [ReactiveFormsModule, CommonModule,FontAwesomeModule,NgxPrintModule]
})
export class ResumeComponent {
  faTeletype = faPhoneAlt;
  faEnvelope = faEnvelope;
  resumeForm: FormGroup;
  currentDate: Date = new Date();
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private geminiService: GeminiService) {
    this.resumeForm = this.fb.group({
      name: [''],
      birthDate: [''],
      Address: [''],
      familyStatus: [''],
      email: [''],
      phone: [''],
      nationality: [''],
      languages: [''],
      level: [''],
      workExperience: [''],
      workPlace: [''],
      workPlaceDate: [''],
      workshops: [''],
      workshopsPlace: [''],
      workshopsPlaceDate: [''],
      school: [''],
      schoolPlace: [''],
      schoolDate: [''],
      EDV: [''],
      my_strong: [''],
    });
  }

  async processInput(userInput: string) {
    const response = await this.geminiService.generateResponse(userInput);
  
    if (response) {
      this.resumeForm.patchValue(response);
    } else {
      console.error("Failed to get a response from Gemini AI.");
    }
  }
  downloadPDF() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
    if (isMobile) {
      // Use window.print() as a fallback for mobile
      window.print();
    } else {
      // Trigger ngx-print for desktop
      const printButton = document.getElementById('desktopPrintButton');
      if (printButton) {
        printButton.click();
      }
    }
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
