import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth-service/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  userForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.userForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
        email: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.pattern(/\@[a-zA-Z]+\.[a-zA-Z]+$/)
          ]
        ],
        password: ['', [Validators.required, Validators.minLength(4)]],
        repass: ['', Validators.required]
      },
      {
        validators: this.passwordMatchValidator('password', 'repass')  
      }
    );
  }

  get f() {
    return this.userForm.controls;
  }

  passwordMatchValidator(passwordKey: string, repassKey: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get(passwordKey)?.value;
      const repass = group.get(repassKey)?.value;
      return password === repass ? null : { passwordMismatch: true };
    };
  }

  onSubmit() {
    this.submitted = true;

    if (this.userForm.invalid) {
      return;
    }

    const formData = this.userForm.value;

    this.authService.register(formData).subscribe({
      next: () => this.router.navigate(['/profile']),
      error: (err: any) => console.error('Registration failed', err)
    });
  }
}
