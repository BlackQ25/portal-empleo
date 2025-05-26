import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from '../../service/base.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
})
export class UserDetailsComponent implements OnInit {
  userDetails: any;
  role: string = '';
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private baseService: BaseService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.baseService.getUserById(id).subscribe((user) => {
      this.role = user.role;

      if (this.role === 'candidate') {
        this.baseService.getCandidateById(id).subscribe((data) => {
          this.userDetails = data;
          this.isLoading = false;
        });
      } else if (this.role === 'company') {
        this.baseService.getCompanyById(id).subscribe((data) => {
          this.userDetails = data;
          this.isLoading = false;
        });
      } else if (this.role === 'admin') {
        this.baseService.getAdminById(id).subscribe((data) => {
          this.userDetails = data;
          this.isLoading = false;
        });
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
