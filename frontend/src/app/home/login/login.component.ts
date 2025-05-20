import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
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

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
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
    if (this.loginForm.invalid) {
      // Marca los campos como tocados para que se muestren los errores
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;
    this.isLoading = true;

    this.apiService.login(email, password).subscribe({
      next: (res: any) => {
        if (res.success === false) {
          this.errorMessage = res.message || 'Credenciales incorrectas';
        } else {
          this.authService.setLogin(email);
          this.router.navigate(['/board']);
        }
        this.isLoading = false;
      },
      error: (err) => {
        if (err.status === 401 || err.status === 403) {
          this.errorMessage = 'Credenciales incorrectas';
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
