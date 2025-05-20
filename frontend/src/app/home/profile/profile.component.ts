import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileData: any;
  role: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getUserProfile().subscribe(data => {
      this.profileData = data;
      this.role = data.role;
    });
  }
}
