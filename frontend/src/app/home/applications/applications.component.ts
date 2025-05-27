import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../service/base.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
  applications: any;
  loading: boolean = true;

  constructor(private baseService: BaseService) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user.id;

    this.baseService.getApplicationsByUserId(userId).subscribe({
      next: (data) => {
        console.log('Aplicaciones del usuario:', data);
        this.applications = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar aplicaciones', err);
        this.loading = false;
      }
    });
  }
}
