import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../service/base.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
  applications: any;
  loading: boolean = true;

  constructor(
    private baseService: BaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user.id;

    this.baseService.getApplicationsByUserId(userId).subscribe({
      next: (data) => {
        this.applications = data;
        console.log(this.applications);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar aplicaciones', err);
        this.loading = false;
      }
    });
  }

  goToUserDetails(userId: number): void {
    this.router.navigate(['/user-details', userId]);
  }
}
