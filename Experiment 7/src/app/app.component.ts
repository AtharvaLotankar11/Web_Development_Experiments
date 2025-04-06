import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgFor],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form: FormGroup;
  submittedItems: any[] = [];
  readonly MAX_FEEDBACK_LENGTH = 200; // Character limit
  readonly STORAGE_KEY = 'feedbackData';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      feedback: ['', [Validators.required, Validators.maxLength(this.MAX_FEEDBACK_LENGTH)]]
    });

    // Load data from local storage on initialization
    const storedData = localStorage.getItem(this.STORAGE_KEY);
    if (storedData) {
      this.submittedItems = JSON.parse(storedData);
    }
  }

  // Getter for dynamic counter styling
  get counterClass() {
    const remaining = this.MAX_FEEDBACK_LENGTH - (this.form.get('feedback')?.value?.length || 0);
    if (remaining > this.MAX_FEEDBACK_LENGTH * 0.5) return 'text-success';
    else if (remaining > this.MAX_FEEDBACK_LENGTH * 0.2) return 'text-warning';
    else return 'text-danger';
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      
      // Check for duplicates
      const isDuplicate = this.submittedItems.some(item => 
        item.name === formData.name && 
        item.email === formData.email && 
        item.feedback === formData.feedback
      );

      if (isDuplicate) {
        alert('This feedback has already been submitted!');
        return;
      }

      this.submittedItems.push(formData);
      
      // Save to local storage
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.submittedItems));
      
      this.form.reset();
    }
  }
}