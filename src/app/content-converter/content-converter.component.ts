import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPhoneAlt,faEnvelope } from '@fortawesome/free-solid-svg-icons';
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
  @Input() resumeForm: any; 
  @Input() selectedFile: File | null = null; // To receive selected file
 
  



  createImageUrl(file: File): string {
    return URL.createObjectURL(file);
  }}