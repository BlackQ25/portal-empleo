import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { BaseService } from '../../service/base.service';

@Component({
  selector: 'app-catalog-item',
  templateUrl: './catalog-item.component.html',
  styleUrls: ['./catalog-item.component.scss'],
})
export class CatalogItemComponent implements OnInit {
  offerId!: number;
  offerDetails: any;
  isLoading = true;
  hasError = false;

  constructor(
    private route: ActivatedRoute,
    private baseService: BaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.offerId = +this.route.snapshot.paramMap.get('id')!;
    this.getOfferDetails();
  }

  getOfferDetails(): void {
    this.baseService.getJobOfferById(this.offerId).subscribe({
      next: (data) => {
        console.log('Detalles completos de la oferta:', data);
        this.offerDetails = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al obtener detalles:', err);
        this.hasError = true;
        this.isLoading = false;
      },
    });
  }

  goToUserDetails(): void {
  const companyId = this.offerDetails?.company?.user?.id;
  if (companyId) {
    this.router.navigate(['/user-details', companyId]);
  }
}
}
