import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '../../service/base.service';

@Component({
  selector: 'app-offers-edit',
  templateUrl: './offers-edit.component.html',
  styleUrls: ['./offers-edit.component.scss']
})
export class OffersEditComponent implements OnInit {
  offerId!: number;
  offerData: any = {
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

  showSuccess = false;
  showError = false;

  constructor(
    private route: ActivatedRoute,
    private baseService: BaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.offerId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadOffer();
    this.loadCategories();
    this.loadStates();
    this.loadCities();
    this.loadContracts();
  }

  loadOffer(): void {
    this.baseService.getJobOfferById(this.offerId).subscribe({
      next: (data) => {
        this.offerData = {
          title: data.title,
          description: data.description,
          salary: data.salary,
          categoryId: data.category.id,
          stateId: data.state.id,
          cityId: data.city.id,
          contractId: data.contract?.id || null
        };
      },
      error: () => {
        this.showError = true;
      }
    });
  }

  loadCategories() {
    this.baseService.getCategories().subscribe({ next: (res) => this.categories = res });
  }

  loadStates() {
    this.baseService.getStates().subscribe({ next: (res) => this.states = res });
  }

  loadCities() {
    this.baseService.getCities().subscribe({ next: (res) => this.cities = res });
  }

  loadContracts() {
    this.baseService.getContracts().subscribe({ next: (res) => this.contracts = res });
  }

  updateOffer(): void {
    const userId = JSON.parse(localStorage.getItem('user') || '{}')?.id;

    const request = {
      ...this.offerData,
      publishedAt: new Date().toISOString()
    };

    this.baseService.updateJobOffer(this.offerId, request, userId).subscribe({
      next: () => {
        this.showSuccess = true;
        setTimeout(() => {
          this.router.navigate(['/offers-catalog']);
        }, 2000);
      },
      error: () => {
        this.showError = true;
        setTimeout(() => this.showError = false, 3000);
      }
    });
  }
}
