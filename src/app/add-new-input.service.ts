import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AddNewInputService {

  constructor(private fb: FormBuilder) {}

  // Function to add a new entry to any FormArray
  addFormArrayControl(array: FormArray, controls: any) {
    const newGroup = this.fb.group(controls);
    array.push(newGroup);
  }
}