import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'http://ea6-api.upc.edu/api/users'; 

  constructor(private http: HttpClient) { }


  signup(user: { email: string, password: string}): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }
}