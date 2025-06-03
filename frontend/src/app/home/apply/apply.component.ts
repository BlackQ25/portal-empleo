import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '../../service/base.service';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss'],
})
export class ApplyComponent implements OnInit {
  offerId!: number;
  offer: any;
  candidate: any;
  loading: boolean = true;
  error: string = '';
  showSuccessToast: boolean = false;
  showErrorToast: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private baseService: BaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.offerId = +this.route.snapshot.paramMap.get('id')!;
    this.loadOfferData();
    this.loadCandidateData();
  }

  loadOfferData(): void {
    this.baseService.getJobOfferById(this.offerId).subscribe({
      next: (data) => {
        this.offer = data;
      },
      error: () => {
        this.error = 'No se pudo cargar la información de la oferta.';
      },
    });
  }

  loadCandidateData(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const id = user?.id;
    this.baseService.getCandidateById(id).subscribe({
      next: (data) => {
        this.candidate = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo cargar la información del candidato.';
        this.loading = false;
      },
    });
  }

  confirmApplication(): void {
    const applicationPayload = {
      candidateId: this.candidate.user.id,
      jobOfferId: this.offerId,
      appliedAt: new Date().toISOString(),
      status: 'pending',
    };

    this.baseService.applyToOffer(applicationPayload).subscribe({
      next: () => {
        this.showSuccessToast = true;

        setTimeout(() => {
          this.showSuccessToast = false;
          this.router.navigate(['/catalog']);
        }, 2500);
      },
      error: () => {
        this.showErrorToast = true;

        setTimeout(() => {
          this.showErrorToast = false;
        }, 3000);
      },
    });
  }
}
