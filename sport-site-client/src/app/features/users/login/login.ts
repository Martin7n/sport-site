import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service/auth.service';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';




@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  loginForm: FormGroup;
  submitted = false;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    
    
  ) {
    this.loginForm = this.fb.group({
      loginId: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      rememberMe: [false]
    });
  }

  
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
  this.submitted = true;
  this.loginError = null;

  if (this.loginForm.invalid) {
    return;
  }

  const { loginId, password, rememberMe } = this.loginForm.value;
  const payload = { loginId, password };
  
  this.authService.login(payload, rememberMe).subscribe({
    next: (res) => {
      console.log('Login success:', res);
      localStorage.setItem('auth_token', res.token);
      // this.authService.isLoggedIn.set(true)
       this.router.navigate(['/']);
    },
    error: (err) => {
      console.error('Login failed:', err);
      this.loginError = err.error?.error || 'Login failed. Please try again.';
    }
  });
}
}

