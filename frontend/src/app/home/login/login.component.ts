import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseService } from '../../service/base.service';
import { AuthService } from '../../service/auth.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';
  isLoading = false;
  formSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private baseService: BaseService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;
    this.isLoading = true;

    this.baseService.login(email, password).subscribe({
      next: (res: any) => {
        if (res.success === false) {
          this.errorMessage = res.message || 'Credenciales incorrectas';
        } else {
          this.authService.setLogin(email);
          localStorage.setItem(
            'user',
            JSON.stringify({
              id: res.id || res.userId,
              email: res.email,
              role: res.role,
            })
          );
          this.router.navigate(['/catalog']);
        }
        this.isLoading = false;
      },
      error: (err) => {
        const backendMsg = err?.error;

        if (err.status === 401 || err.status === 403) {
          if (typeof backendMsg === 'string') {
            this.errorMessage = backendMsg;
          } else if (backendMsg?.message) {
            this.errorMessage = backendMsg.message;
          } else {
            this.errorMessage = 'Credenciales incorrectas';
          }
        } else {
          this.errorMessage = 'Error del servidor. Intenta más tarde.';
        }

        this.isLoading = false;
      },
    });
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
