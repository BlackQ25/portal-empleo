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
  formSubmitted = false;
  selectedFile: File | null = null;

  constructor(private baseService: BaseService, private router: Router) { }

  setRole(selected: 'candidate' | 'company') {
    this.role = selected;
  }

  register() {
    this.formSubmitted = true;

    // Validación de email y contraseña
    if (!this.user.email || !this.user.password) {
      return;
    }

    if (this.role === 'candidate') {
      if (!this.selectedFile) return;

      const dto = {
        email: this.user.email,
        password: this.user.password,
        name: this.candidateData.name,
        phone: this.candidateData.phone,
        address: this.candidateData.address,
        birthDate: this.candidateData.birthDate,
        skills: this.candidateData.skills,
        experience: this.candidateData.experience,
      };


      const formData = new FormData();
      formData.append('dto', new Blob([JSON.stringify(dto)], { type: 'application/json' }));
      formData.append('resumeFile', this.selectedFile!);
      console.log('Archivo enviado:', this.selectedFile);
      console.log('FormData DTO:', formData.get('dto'));
      console.log('FormData resumeFile:', formData.get('resumeFile'));


      this.baseService.registerCandidateWithFile(formData).subscribe({
        next: () => {
          this.showSuccessToast = true;
          setTimeout(() => (this.showSuccessToast = false), 4000);
        },
        error: () => {
          this.showErrorToast = true;
          setTimeout(() => (this.showErrorToast = false), 4000);
        },
      });
    } else if (this.role === 'company') {
      const { companyName, companyDescription, phone, address } = this.companyData;

      if (!companyName || !companyDescription || !phone || !address) return;

      const data = {
        ...this.user,
        ...this.companyData,
      };

      this.baseService.registerCompany(data).subscribe({
        next: () => {
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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
