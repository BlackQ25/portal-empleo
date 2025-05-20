import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroment/enviroment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post(`${this.baseUrl}/auth/login`, { email, password });
  }

  getJobOffers() {
    return this.http.get<any[]>(`${this.baseUrl}/job-offers`);
  }

  getCompanies() {
    return this.http.get<any[]>(`${this.baseUrl}/companies`);
  }

  getCategories() {
    return this.http.get<any[]>(`${this.baseUrl}/categories`);
  }

  getStates() {
    return this.http.get<any[]>(`${this.baseUrl}/states`);
  }

}
