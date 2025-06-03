import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '../../service/base.service';
import { AuthService } from '../../service/auth.service';

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
  role: any;

  constructor(
    private route: ActivatedRoute,
    private baseService: BaseService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.offerId = +this.route.snapshot.paramMap.get('id')!;
    this.getOfferDetails();
    this.role = this.authService.getUserRole();
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

  goToApply(): void {
    this.router.navigate(['/apply', this.offerId]);
  }
}
