import { Component } from '@angular/core';
import { BaseService } from '../../service/base.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  role: 'candidate' | 'company' = 'candidate';

  user = {
    email: '',
    password: '',
  };

  candidateData = {
    name: '',
    phone: '',
    address: '',
    resume: '',
    birthDate: '',
    skills: '',
    experience: '',
  };

  companyData = {
    companyName: '',
    companyDescription: '',
    website: '',
    phone: '',
    address: '',
  };

  showSuccessToast = false;
  showErrorToast = false;

  constructor(private baseService: BaseService, private router: Router) {}

  setRole(selected: 'candidate' | 'company') {
    this.role = selected;
  }

  register() {
    if (!this.role) return;

    if (this.role === 'candidate') {
      const data = {
        ...this.user,
        ...this.candidateData,
      };

      this.baseService.registerCandidate(data).subscribe({
        next: () => {
          console.log('✅ Registro exitoso');
          this.showSuccessToast = true;
          setTimeout(() => (this.showSuccessToast = false), 4000);
        },
        error: () => {
          this.showErrorToast = true;
          setTimeout(() => (this.showErrorToast = false), 4000);
        },
      });
    } else if (this.role === 'company') {
      const data = {
        ...this.user,
        ...this.companyData,
      };

      this.baseService.registerCompany(data).subscribe({
        next: () => {
          console.log('✅ Registro exitoso');
          this.showSuccessToast = true;
          setTimeout(() => (this.showSuccessToast = false), 4000);
        },
        error: () => {
          this.showErrorToast = true;
          setTimeout(() => (this.showErrorToast = false), 4000);
        },
      });
    }
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
