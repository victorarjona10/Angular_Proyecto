import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  getUserById(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/users/${userId}`, { headers });
  }
  
  getAllUsers(page: number, limit: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = { page: page.toString(), limit: limit.toString() };
    return this.http.get<any>(`${this.apiUrl}/users`, { headers, params });
  }

  inactivateUser(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiUrl}/users/InactivateFlag/${userId}`, { headers });
  }

  activateUser(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiUrl}/users/ActivateFlag/${userId}`, { headers });
  }

  updateUser(user: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiUrl}/users/${user._id}`, user, { headers });
  }

  getOrdersByUserId(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/orders/AllOrdersByUser/${userId}`, { headers });
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users`, user);
  }

  searchUsers(criteria: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/search-users`, criteria);
  }

  createOrder(order: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}/orders`, order, { headers });
  }


  getUsersByFiltration(user: any, page: number, limit: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Convertir el objeto user en query parameters
    const params = new HttpParams({ fromObject: user });

    return this.http.get<any>(`${this.apiUrl}/users/usersByFiltration`, { headers, params });
}

  updateOrderQuantity(orderId: string, productId: string, quantityValue: number): Observable<any> {
    const body = {
      products: [
        {
          product_id: productId,  
          quantity: quantityValue  
        }
      ]
    };
    return this.http.put<any>(`${this.apiUrl}/orders/${orderId}`, body);
  }

  deleteOrderById(orderId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/orders/${orderId}`);
  }

  deleteProductFromOrderById(orderId:string, productId: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/orders/${orderId}/${productId}`, '');
  }

  Login(email: string, password: string): Observable<any> {
    const body = { 
      email: email,
      password: password };
    return this.http.post<any>(`${this.apiUrl}/admins/login`, body);
  }


}