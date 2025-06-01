import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../../service/base.service';

@Component({
  selector: 'app-offers-create',
  templateUrl: './offers-create.component.html',
  styleUrls: ['./offers-create.component.scss']
})
export class OffersCreateComponent implements OnInit {
  offerData = {
    title: '',
    description: '',
    salary: '',
    categoryId: null,
    stateId: null,
    cityId: null,
    contractId: null
  };

  categories: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  contracts: any[] = [];

  showSuccessToast = false;
  showErrorToast = false;

  constructor(private baseService: BaseService, private router: Router) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadStates();
    this.loadCities();
    this.loadContracts();
  }

  loadCategories() {
    this.baseService.getCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => console.error('Error al cargar categorías', err)
    });
  }

  loadStates() {
    this.baseService.getStates().subscribe({
      next: (data) => (this.states = data),
      error: (err) => console.error('Error al cargar estados', err)
    });
  }

  loadCities() {
    this.baseService.getCities().subscribe({
      next: (data) => (this.cities = data),
      error: (err) => console.error('Error al cargar ciudades', err)
    });
  }

  loadContracts() {
    this.baseService.getContracts().subscribe({
      next: (data) => (this.contracts = data),
      error: (err) => console.error('Error al cargar contratos', err)
    });
  }

  createOffer(): void {
    const companyId = JSON.parse(localStorage.getItem('user') || '{}')?.id;

    const requestBody = {
      ...this.offerData,
      publishedAt: new Date().toISOString()
    };

    this.baseService.createJobOffer(requestBody, companyId).subscribe({
      next: () => {
        this.showSuccessToast = true;
        setTimeout(() => {
          this.showSuccessToast = false;
          this.router.navigate(['/offers-catalog']);
        }, 2000);
      },
      error: () => {
        this.showErrorToast = true;
        setTimeout(() => (this.showErrorToast = false), 3000);
      }
    });
  }

  closeSuccessToast() {
    this.showSuccessToast = false;
  }

  closeErrorToast() {
    this.showErrorToast = false;
  }
}
