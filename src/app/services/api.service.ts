import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:4000/api'; // Canvia aquesta URL per la teva API

  constructor(private http: HttpClient) {}

  getUserData(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/users`, { headers });
  }

  getUserDataByEmail(email: string): Observable<any> {
    const token = localStorage.getItem('email');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/users/email/${email}`, { headers });
  }
}