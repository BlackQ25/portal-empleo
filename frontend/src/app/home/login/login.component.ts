import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';

  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    this.isLoading = true;

    this.http
      .post<any>('http://localhost:8080/api/auth/login', { email, password })
      .subscribe({
        next: () => {
          setTimeout(() => {
            this.authService.setLogin(email);
            this.router.navigate(['/board']);
            this.isLoading = false;
          }, 2000);
        },
        error: () => {
          this.errorMessage = 'Credenciales incorrectas';
          this.isLoading = false;
        },
      });
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
