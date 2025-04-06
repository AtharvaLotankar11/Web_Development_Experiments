import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // Make sure this is imported
import { CommonModule } from '@angular/common'; // For *ngFor and *ngIf
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule, // <-- Must be here
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }