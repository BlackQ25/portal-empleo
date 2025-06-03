import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../service/base.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-catalog',
  templateUrl: './users-catalog.component.html',
  styleUrls: ['./users-catalog.component.scss'],
})
export class UsersCatalogComponent implements OnInit {
  adminData = {
    email: '',
    password: '',
    name: '',
  };

  deleteData = {
    email: '',
    role: '',
  };

  allUsers: any[] = [];
  candidates: any[] = [];
  companies: any[] = [];
  admins: any[] = [];
  searchText: string = '';
  filteredCandidates: any[] = [];
  filteredCompanies: any[] = [];
  filteredAdmins: any[] = [];

  activeTab: string = 'candidate';

  showSuccessToast = false;
  showErrorToast = false;
  showDeleteSuccess = false;
  showDeleteError = false;

  selectedUserId: number | null = null;
  newPassword: string = '';

  showPasswordSuccess = false;
  showPasswordError = false;


  constructor(private baseService: BaseService, private router: Router) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.baseService.getAllUsers().subscribe({
      next: (users) => {
        this.allUsers = users;
        this.candidates = users.filter((u) => u.role === 'candidate');
        this.companies = users.filter((u) => u.role === 'company');
        this.admins = users.filter((u) => u.role === 'admin');

        this.filteredCandidates = [...this.candidates];
        this.filteredCompanies = [...this.companies];
        this.filteredAdmins = [...this.admins];
      },
      error: () => {
        console.error('Error al cargar usuarios');
      },
    });
  }

  deleteUser(): void {
    const email = this.deleteData.email.trim().toLowerCase();
    const role = this.deleteData.role;

    const user = this.allUsers.find((u) => u.email.toLowerCase() === email);

    if (!user || user.role !== role) {
      this.showDeleteError = true;
      setTimeout(() => (this.showDeleteError = false), 3000);
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
        setTimeout(() => (this.showDeleteError = false), 3000);
        return;
    }

    deleteCall.subscribe({
      next: () => {
        this.showDeleteSuccess = true;
        this.clearDeleteForm();
        this.loadUsers();
        setTimeout(() => (this.showDeleteSuccess = false), 3000);
      },
      error: () => {
        this.showDeleteError = true;
        setTimeout(() => (this.showDeleteError = false), 3000);
      },
    });
  }

  filterUsers(): void {
    const text = this.searchText.toLowerCase();

    const matches = (user: any) =>
      user.email.toLowerCase().includes(text) ||
      user.id.toString().includes(text);

    if (this.activeTab === 'candidate') {
      this.filteredCandidates = this.candidates.filter(matches);
    } else if (this.activeTab === 'company') {
      this.filteredCompanies = this.companies.filter(matches);
    } else if (this.activeTab === 'admin') {
      this.filteredAdmins = this.admins.filter(matches);
    }
  }

  changeTab(tab: string): void {
    this.activeTab = tab;
    this.searchText = '';
    this.filterUsers(); // Restaura la lista completa para la pestaña activa
  }

  clearAdminForm(): void {
    this.adminData = {
      email: '',
      password: '',
      name: '',
    };
  }

  clearDeleteForm(): void {
    this.deleteData = {
      email: '',
      role: '',
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

  goToUserDetails(userId: number): void {
    this.router.navigate(['/user-details', userId]);
  }


  openPasswordModal(user: any): void {
    this.selectedUserId = user.id;
    this.newPassword = '';
    const modal = new (window as any).bootstrap.Modal(
      document.getElementById('changePasswordModal')
    );
    modal.show();
  }

  updatePassword(): void {
    if (!this.selectedUserId || !this.newPassword) return;

    this.baseService
      .updateUserPassword(this.selectedUserId, this.newPassword)
      .subscribe({
        next: () => {
          this.showPasswordSuccess = true;
          setTimeout(() => (this.showPasswordSuccess = false), 3000);
        },
        error: () => {
          this.showPasswordError = true;
          setTimeout(() => (this.showPasswordError = false), 3000);
        },
      });
  }

  closePasswordSuccess(): void {
    this.showPasswordSuccess = false;
  }

  closePasswordError(): void {
    this.showPasswordError = false;
  }


}
