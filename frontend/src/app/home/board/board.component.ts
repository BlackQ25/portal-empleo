import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { forkJoin } from 'rxjs';
import { JobOffer } from './model/joboffer';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  jobOffers: {
    title: string;
    company: string;
    category: string;
    state: string;
    publishedAt: string;
  }[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    forkJoin({
      companies: this.apiService.getCompanies(),
      categories: this.apiService.getCategories(),
      states: this.apiService.getStates(),
      offers: this.apiService.getJobOffers()
    }).subscribe(({ offers }) => {
      this.jobOffers = offers.map((offer: JobOffer) => ({
        title: offer.title,
        company: offer.company?.companyName || 'Desconocido',
        category: offer.category?.name || 'Desconocida',
        state: offer.state?.name || 'Sin estado',
        publishedAt: offer.publishedAt || ' ',
      }));
    });
  }
}
