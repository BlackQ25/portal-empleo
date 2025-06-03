import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';

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

  getAllUsers() {
    return this.http.get<any[]>(`${this.baseUrl}/user`);
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

  getCities() {
    return this.http.get<any[]>(`${this.baseUrl}/city`);
  }

  getContracts() {
    return this.http.get<any[]>(`${this.baseUrl}/contract`);
  }

  getUserById(id: number) {
    return this.http.get<any>(`${this.baseUrl}/user/${id}`);
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

  getJobOfferById(id: number) {
    return this.http.get<any>(`${this.baseUrl}/job-offer/${id}`);
  }

  applyToOffer(application: { candidateId: number; jobOfferId: number }) {
    return this.http.post(`${this.baseUrl}/application`, application);
  }

  getApplicationsByUserId(id: number) {
    return this.http.get(`${this.baseUrl}/application/user/${id}`);
  }

  registerAdmin(data: any) {
    return this.http.post(`${this.baseUrl}/user/register-admin`, data, {
      withCredentials: true,
    });
  }

  deleteAdmin(userId: number) {
    return this.http.delete(`${this.baseUrl}/user/admin/${userId}`);
  }

  deleteCandidate(userId: number) {
    return this.http.delete(`${this.baseUrl}/user/candidate/${userId}`);
  }

  deleteCompany(userId: number) {
    return this.http.delete(`${this.baseUrl}/user/company/${userId}`);
  }

  createJobOffer(data: any, userId: number) {
    return this.http.post(`${this.baseUrl}/job-offer?userId=${userId}`, data);
  }

  registerCandidateWithFile(formData: FormData) {
    return this.http.post(`${this.baseUrl}/user/register-candidate`, formData);
  }

  updateUserPassword(userId: number, newPassword: string) {
    return this.http.put(`${this.baseUrl}/user/update-password/${userId}`, {
      newPassword,
    });
  }

  updateUserProfileWithResume(id: number, formData: FormData) {
    return this.http.put(`${this.baseUrl}/candidate/update-with-resume/${id}`, formData)
  }

  deleteResume(candidateId: number) {
    return this.http.delete(
      `${this.baseUrl}/candidate/delete-resume/${candidateId}`
    );
  }
}
