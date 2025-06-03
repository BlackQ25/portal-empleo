import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../service/base.service';
import { forkJoin } from 'rxjs';
import { JobOffer } from './model/joboffer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  searchText: string = '';
  selectedCategory: string = '';
  selectedState: string = '';
  selectedDate: string = '';
  selectedContract: string = '';

  jobOffers: any[] = [];
  filteredOffers: any[] = [];

  categories: any[] = [];
  states: any[] = [];
  contracts: any[] = [];

  offersPerPage: number = 10; // valor por defecto
  currentPage: number = 1;

  constructor(
    private baseService: BaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    forkJoin({
      companies: this.baseService.getCompanies(),
      categories: this.baseService.getCategories(),
      states: this.baseService.getStates(),
      offers: this.baseService.getJobOffers(),
      contracts: this.baseService.getContracts(),
    }).subscribe(({ categories, states, offers, contracts }) => {
      this.categories = categories;
      this.states = states;
      this.contracts = contracts;

      this.jobOffers = offers.map((offer: JobOffer) => ({
        title: offer.title,
        company: offer.company?.companyName || '',
        category: offer.category?.name || '',
        state: offer.state?.name || '-',
        publishedAt: offer.publishedAt || '',
        contract: offer.contract?.name || '',
        id: offer.id || 0
      }));

      this.filteredOffers = [...this.jobOffers];
    });
  }

  filterOffers(): void {
    const term = this.searchText.toLowerCase();
    this.filteredOffers = this.jobOffers.filter((offer) => {
      const matchesText =
        offer.title.toLowerCase().includes(term) ||
        offer.company.toLowerCase().includes(term) ||
        offer.category.toLowerCase().includes(term);
      offer.state.toLowerCase().includes(term) ||
        offer.contract.toLowerCase().includes(term);

      const matchesCategory =
        !this.selectedCategory || offer.category === this.selectedCategory;

      const matchesState =
        !this.selectedState || offer.state === this.selectedState;

      const matchesDate =
        !this.selectedDate ||
        offer.publishedAt?.substring(0, 10) === this.selectedDate;

      const matchesContract =
        !this.selectedContract || offer.contract === this.selectedContract;

      return matchesText && matchesCategory && matchesState && matchesDate && matchesContract;
    });

    this.resetPagination();
  }

  clearSearchText(): void {
    this.searchText = '';
    this.filterOffers();
  }

  clearCategory(): void {
    this.selectedCategory = '';
    this.filterOffers();
  }

  clearState(): void {
    this.selectedState = '';
    this.filterOffers();
  }

  clearContract(): void {
    this.selectedContract = '';
    this.filterOffers();
  }

  clearDate(): void {
    this.selectedDate = '';
    this.filterOffers();
  }

  get paginatedOffers(): any[] {
    const start = (this.currentPage - 1) * this.offersPerPage;
    const end = start + this.offersPerPage;
    return this.filteredOffers.slice(start, end);
  }

  get totalPages(): number[] {
    const total = Math.ceil(this.filteredOffers.length / this.offersPerPage);
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages.length) {
      this.currentPage = page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  resetPagination(): void {
    this.currentPage = 1;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  goToDetails(id: number): void {
    this.router.navigate(['/catalog-item', id]);
  }

}
