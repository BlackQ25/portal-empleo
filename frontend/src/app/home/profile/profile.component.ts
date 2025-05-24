import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../service/base.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileData: any;
  role: string = '';
  isLoading: boolean = true;
  isEditing: boolean = false;
  originalData: any;
  showSuccessToast = false;
  showErrorToast = false;

  constructor(private baseService: BaseService) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.role && user.id) {
      this.role = user.role;
      const id = user.id;

      switch (user.role) {
        case 'candidate':
          this.baseService.getCandidateById(id).subscribe((data) => {
            this.profileData = data;
            this.isLoading = false;
          });
          break;
        case 'company':
          this.baseService.getCompanyById(id).subscribe((data) => {
            this.profileData = data;
            this.isLoading = false;
          });
          break;
        case 'admin':
          this.baseService.getAdminById(id).subscribe((data) => {
            this.profileData = data;
            this.isLoading = false;
          });
          break;
        default:
          this.isLoading = false;
      }
    } else {
      this.isLoading = false;
    }
  }

  editProfile() {
    this.originalData = structuredClone(this.profileData);
    this.isEditing = true;
  }

  cancelEdit(): void {
    console.log('Cancelando edición… recargando datos originales');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const id = user?.id;

    if (!id) {
      this.isEditing = false;
      return;
    }

    this.isLoading = true;

    switch (this.role) {
      case 'candidate':
        this.baseService.getCandidateById(id).subscribe((data) => {
          this.profileData = data;
          this.isEditing = false;
          this.isLoading = false;
        });
        break;

      case 'company':
        this.baseService.getCompanyById(id).subscribe((data) => {
          this.profileData = data;
          this.isEditing = false;
          this.isLoading = false;
        });
        break;

      case 'admin':
        this.baseService.getAdminById(id).subscribe((data) => {
          this.profileData = data;
          this.isEditing = false;
          this.isLoading = false;
        });
        break;

      default:
        this.isEditing = false;
        this.isLoading = false;
    }
  }

  saveChanges(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const id = user?.id;

    if (!id || this.role === 'admin') {
      console.warn('Rol no editable o ID inválido');
      this.isEditing = false;
      return;
    }

    this.baseService
      .updateUserProfile(this.role, id, this.profileData)
      .subscribe({
        next: () => {
          this.isEditing = false;
          this.showSuccessToast = true;
          setTimeout(() => (this.showSuccessToast = false), 4000);
        },
        error: (err) => {
          console.error('Error al actualizar perfil:', err);
          this.showErrorToast = true;
          setTimeout(() => (this.showErrorToast = false), 4000);
        },
      });
  }
}
