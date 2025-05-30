import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../service/base.service';

@Component({
  selector: 'app-users-catalog',
  templateUrl: './users-catalog.component.html',
  styleUrls: ['./users-catalog.component.scss']
})
export class UsersCatalogComponent implements OnInit {
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
  candidates: any[] = [];
  companies: any[] = [];
  admins: any[] = [];

  activeTab: string = 'candidate';

  showSuccessToast = false;
  showErrorToast = false;
  showDeleteSuccess = false;
  showDeleteError = false;

  constructor(private baseService: BaseService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.baseService.getAllUsers().subscribe({
      next: (users) => {
        this.allUsers = users;
        this.candidates = users.filter(u => u.role === 'candidate');
        this.companies = users.filter(u => u.role === 'company');
        this.admins = users.filter(u => u.role === 'admin');
        console.log('Usuarios cargados:', this.allUsers);
      },
      error: () => {
        console.error('Error al cargar usuarios');
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

  closeSuccessToast(): void {
    this.showSuccessToast = false;
  }

  closeErrorToast(): void {
    this.showErrorToast = false;
  }

  closeDeleteSuccess(): void {
    this.showDeleteSuccess = false;
  }

  closeDeleteError(): void {
    this.showDeleteError = false;
  }
}
