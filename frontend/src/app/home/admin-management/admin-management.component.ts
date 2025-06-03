import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../service/base.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-admin-management',
  templateUrl: './admin-management.component.html',
  styleUrls: ['./admin-management.component.scss']
})
export class AdminManagementComponent implements OnInit {
  adminData = {
    email: '',
    password: '',
    name: ''
  };

  deleteData = {
    email: '',
    role: ''
  };

  allUsers: any[] = [];

  showSuccessToast = false;
  showErrorToast = false;

  showDeleteSuccess = false;
  showDeleteError = false;

  constructor(
    private baseService: BaseService,
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.baseService.getAllUsers().subscribe({
      next: (users) => {
        this.allUsers = users;
      },
      error: () => {
        console.error('Error al cargar usuarios');
      }
    });
  }

  createAdmin(): void {
    this.baseService.registerAdmin(this.adminData).subscribe({
      next: () => {
        this.showSuccessToast = true;

        this.clearAdminForm();
        this.loadUsers();

        setTimeout(() => {
          this.showSuccessToast = false;
        }, 3000);
      },
      error: () => {
        this.showErrorToast = true;
        setTimeout(() => {
          this.showErrorToast = false;
        }, 3000);
      }
    });
  }

  deleteUser(): void {
    const email = this.deleteData.email.trim().toLowerCase();
    const role = this.deleteData.role;

    const user = this.allUsers.find(u => u.email.toLowerCase() === email);

    if (!user || user.role !== role) {
      this.showDeleteError = true;
      setTimeout(() => this.showDeleteError = false, 3000);
      return;
    }

    const id = user.id;

    let deleteCall;

    switch (role) {
      case 'admin':
        deleteCall = this.baseService.deleteAdmin(id);
        break;
      case 'candidate':
        deleteCall = this.baseService.deleteCandidate(id);
        break;
      case 'company':
        deleteCall = this.baseService.deleteCompany(id);
        break;
      default:
        this.showDeleteError = true;
        setTimeout(() => this.showDeleteError = false, 3000);
        return;
    }

    deleteCall.subscribe({
      next: () => {
        this.showDeleteSuccess = true;
        this.clearDeleteForm();
        this.loadUsers();
        setTimeout(() => this.showDeleteSuccess = false, 3000);
      },
      error: () => {
        this.showDeleteError = true;
        setTimeout(() => this.showDeleteError = false, 3000);
      }
    });
  }

  clearAdminForm(): void {
    this.adminData = {
      email: '',
      password: '',
      name: ''
    };
  }

  clearDeleteForm(): void {
    this.deleteData = {
      email: '',
      role: ''
    };
  }

  closeSuccessToast() {
    this.showSuccessToast = false;
  }

  closeErrorToast() {
    this.showErrorToast = false;
  }

  closeDeleteSuccess() {
    this.showDeleteSuccess = false;
  }

  closeDeleteError() {
    this.showDeleteError = false;
  }
}
