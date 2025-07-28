import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  imports: [ReactiveFormsModule, CommonModule, RouterModule]
})
export class Register {
  userForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName:  ['', [Validators.required, Validators.minLength(3)]],
      username:  ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      email:     ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern(/\@[a-zA-Z]+\.[a-zA-Z]+$/) // Matches Mongoose regex
      ]],
      password:  ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  get f() {
    return this.userForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.userForm.invalid) {
      return;
    }

    const formData = this.userForm.value;
    console.log('User registered:', formData);

    // TODO: Call backend API here
  }
}

