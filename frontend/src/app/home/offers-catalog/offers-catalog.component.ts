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
    private router: Router
  ) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.companyId = user?.id || null;

    if (this.companyId) {
      this.loadJobOffers();
    }
  }

  loadJobOffers(): void {
    this.baseService.getJobOffers().subscribe({
      next: (offers) => {

        this.jobOffers = offers.filter((offer: any) => offer.company.userId === this.companyId);
      },
      error: () => {
        console.error('Error al cargar las ofertas');
      }
    });
  }

  deleteOffer(offer: any): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user?.id;

    if (confirm(`¿Estás seguro de que deseas eliminar la oferta "${offer.title}"?`)) {
      this.baseService.deleteJobOffer(offer.id, userId).subscribe({
        next: () => {
          this.loadJobOffers();
          alert('Oferta eliminada correctamente.');
        },
        error: () => alert('Error al eliminar la oferta.')
      });
    }
  }

  editOffer(offer: any): void {
    this.router.navigate(['/offers-edit', offer.id]);
  }

  goToCreate() {
    this.router.navigate(['/offers-create']);
  }

  goToDetails(id: number): void {
    this.router.navigate(['/catalog-item', id]);
  }
}
