import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroment/enviroment';

@Injectable({ providedIn: 'root' })
export class BaseService {
  private readonly baseUrl = environment.url;

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(
      `${this.baseUrl}/auth/login`,
      { email, password },
      { withCredentials: true }
    );
  }

  getJobOffers() {
    return this.http.get<any[]>(`${this.baseUrl}/job-offer`);
  }

  getCompanies() {
    return this.http.get<any[]>(`${this.baseUrl}/company`);
  }

  getCategories() {
    return this.http.get<any[]>(`${this.baseUrl}/category`);
  }

  getStates() {
    return this.http.get<any[]>(`${this.baseUrl}/state`);
  }

  getUserProfile() {
    return this.http.get<any>(`${this.baseUrl}/users/me`, {
      withCredentials: true,
    });
  }

  getCandidateById(id: number) {
    return this.http.get<any>(`${this.baseUrl}/candidate/${id}`);
  }

  getCompanyById(id: number) {
    return this.http.get<any>(`${this.baseUrl}/company/${id}`);
  }

  getAdminById(id: number) {
    return this.http.get<any>(`${this.baseUrl}/admin/${id}`);
  }

  updateUserProfile(role: string, id: number, data: any) {
    const baseUrl = `${this.baseUrl}/${role}/${id}`;
    return this.http.put(baseUrl, data);
  }

  registerCandidate(data: any) {
    return this.http.post(`${this.baseUrl}/user/register-candidate`, data, {
      withCredentials: true,
    });
  }

  registerCompany(data: any) {
    return this.http.post(`${this.baseUrl}/user/register-company`, data, {
      withCredentials: true,
    });
  }
}
