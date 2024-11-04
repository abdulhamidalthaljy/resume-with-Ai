import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import html2pdf from 'html2pdf.js';
import { NgxPrintModule } from 'ngx-print';
import { GeminiService } from '../gemini.service';
import { ContentConverterComponent } from "../content-converter/content-converter.component";
import { FooterComponent } from "../footer/footer.component";
import { Router } from '@angular/router';
@Component({
  selector: 'app-resume',
  standalone: true,
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css'],
  imports: [ReactiveFormsModule, CommonModule, FontAwesomeModule, NgxPrintModule, ContentConverterComponent, FooterComponent]
})
export class ResumeComponent {
  faTeletype = faPhoneAlt;
  faEnvelope = faEnvelope;
  resumeForm: FormGroup;
  currentDate: Date = new Date();
  selectedFile: File | null = null;
  isLoading: boolean = false; 


  constructor(private fb: FormBuilder, private geminiService: GeminiService,private router: Router) {
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

  // Getter functions for easier access to the FormArrays
  get languages(): FormArray {
    return this.resumeForm.get('languages') as FormArray;
  }

  get workExperience(): FormArray {
    return this.resumeForm.get('workExperience') as FormArray;
  }

  get workshops(): FormArray {
    return this.resumeForm.get('workshops') as FormArray;
  }

  get school(): FormArray {
    return this.resumeForm.get('school') as FormArray;
  }

  addSchool(schoolData: { name: string; place: string; date: string }): void {
    this.school.push(this.fb.group({
      schoolName: [schoolData.name],
      schoolPlace: [schoolData.place],
      schoolDate: [schoolData.date]
    }));
  }
  addLanguage(languageData: { language: string; level: string }): void {
    this.languages.push(this.fb.group({
      language: [languageData.language],
      level: [languageData.level]
    }));
  }
  
  addWorkExperience(workData: { position: string; company: string; date: string }): void {
    this.workExperience.push(this.fb.group({
      company: [workData.company],
   
     
      date: [workData.date],
      position: [workData.position]
    }));
  }
  
  addWorkshop(workshopData: { date: string; name: string; place: string }): void {
    this.workshops.push(this.fb.group({
      date: [workshopData.date],
      name: [workshopData.name],
      place: [workshopData.place]
    }));
  }
  

  // Methods to remove entries if needed
  removeLanguage(index: number) {
    this.languages.removeAt(index);
  }

  removeWorkExperience(index: number) {
    this.workExperience.removeAt(index);
  }

  removeWorkshop(index: number) {
    this.workshops.removeAt(index);
  }

  removeSchool(index: number) {
    this.school.removeAt(index);
  }
  
  // Process input and populate form dynamically
  async processInput(userInput: string) {
    this.isLoading = true; // Start loading
    const data = await this.geminiService.generateResponse(userInput);

    if (data) {
      // Set simple form controls
   
     
      const response = await this.geminiService.generateResponse(userInput);
      
      if (response) {
        this.resumeForm.patchValue(response);
      } else {
        console.error("Failed to get a response from Gemini AI.");
      }
    
      this.isLoading = false; 
      // Populate dynamic array data
      this.resumeForm.patchValue({
        name: data.name,
        birthDate: data.birthDate,
        Address: data.Address,
        familyStatus: data.familyStatus,
        email: data.email,
        phone: data.phone,
        nationality: data.nationality,
        EDV: data.EDV,
        my_strong: data.my_strong,
      });
      data.languages?.forEach((lang: any) => this.languages.push(this.fb.group(lang)));
      data.workExperience?.forEach((experience: any) => this.addWorkExperience(experience));
      data.school?.forEach((school: any) => this.addSchool(school));
      data.workshops?.forEach((workshop: any) => this.addWorkshop(workshop));
      
      console.log('Resume form after processing:', this.resumeForm.value);
    } else {
      console.error("Failed to get a response from Gemini AI.");
    }
  }
  
  redirectToPreview() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        sessionStorage.setItem('selectedFile', reader.result as string);
        window.open('/preview', '_blank');
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      window.open('/preview', '_blank');
    }
  }
  

  // Mobile check
  isMobile: boolean = false;
  ngOnInit() {
    this.checkIfMobile(); // Check for mobile on initialization
    this.resumeForm.valueChanges.subscribe((data) => {
      localStorage.setItem('resumeFormData', JSON.stringify(data));
    });
  }

  checkIfMobile() {
    const userAgent = navigator.userAgent || navigator.vendor;
    this.isMobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  }

  // Save as PDF functionality
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

  // File handling for photo uploads
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
  resetForm() {
    this.resumeForm.reset(); // Resets the form to its initial state
    this.selectedFile = null; // Clear the selected file
  }
  
  onSubmit() {
    console.log(this.resumeForm.value);
  }

}
