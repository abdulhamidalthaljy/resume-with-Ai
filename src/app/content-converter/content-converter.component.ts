import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPhoneAlt,faEnvelope } from '@fortawesome/free-solid-svg-icons';
import html2pdf from 'html2pdf.js';
import { CommonModule } from '@angular/common';
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