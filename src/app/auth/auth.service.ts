import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'http://localhost:4000/api/users'; // Canvia per la URL de la teva API

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.get(this.apiUrl, credentials);
  }

  signup(user: { email: string, password: string}): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }
}