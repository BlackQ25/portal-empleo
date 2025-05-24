import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../service/base.service';
import { forkJoin } from 'rxjs';
import { JobOffer } from './model/joboffer';

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

  jobOffers: any[] = [];
  filteredOffers: any[] = [];

  categories: any[] = [];
  states: any[] = [];

  offersPerPage: number = 10; // valor por defecto
  currentPage: number = 1;

  constructor(private baseService: BaseService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    forkJoin({
      companies: this.baseService.getCompanies(),
      categories: this.baseService.getCategories(),
      states: this.baseService.getStates(),
      offers: this.baseService.getJobOffers(),
    }).subscribe(({ companies, categories, states, offers }) => {
      this.categories = categories;
      this.states = states;

      this.jobOffers = offers.map((offer: JobOffer) => ({
        title: offer.title,
        company: offer.company?.companyName || 'Desconocido',
        category: offer.category?.name || 'Desconocida',
        state: offer.state?.name || 'Sin estado',
        publishedAt: offer.publishedAt || '',
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

      const matchesCategory =
        !this.selectedCategory || offer.category === this.selectedCategory;

      const matchesState =
        !this.selectedState || offer.state === this.selectedState;

      const matchesDate =
        !this.selectedDate ||
        offer.publishedAt?.substring(0, 10) === this.selectedDate;

      return matchesText && matchesCategory && matchesState && matchesDate;
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
}
