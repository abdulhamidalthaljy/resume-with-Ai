import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

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
  saveAsPDF() {
    const data = document.getElementById('contentToConvert'); // Replace 'contentToConvert' with the ID of your main content element
    
    if (data) {
      html2canvas(data).then(canvas => {
        const imgWidth = 208;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgData = canvas.toDataURL('image/png');
  
        let position = 0;
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save('webpage.pdf');
      });
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
