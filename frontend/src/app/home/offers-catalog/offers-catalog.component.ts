import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../service/base.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offers-catalog',
  templateUrl: './offers-catalog.component.html',
  styleUrls: ['./offers-catalog.component.scss']
})
export class OffersCatalogComponent implements OnInit {
  jobOffers: any[] = [];
  companyId: number | null = null;

  constructor(
    private baseService: BaseService,
    private router : Router
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.companyId = user?.id || null;

    console.log('id: ', this.companyId);

    if (this.companyId) {
      this.loadJobOffers();
    }
  }

  loadJobOffers(): void {
    this.baseService.getJobOffers().subscribe({
      next: (offers) => {
        console.log('ofertas: ', offers)
        this.jobOffers = offers.filter((offer: any) => offer.company.userId === this.companyId);
      },
      error: () => {
        console.error('Error al cargar las ofertas');
      }
    });
  }

  goToCreate(){
    this.router.navigate(['/offers-create']);
  }

  goToDetails(id: number): void {
    this.router.navigate(['/catalog-item', id]);
  }
}
