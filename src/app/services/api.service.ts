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
    return this.http.get<any>(`${this.apiUrl}/users`);
  }

  getUserDataByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/email/${email}`);
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${userId}`);
  }
  
  getAllUsers(page: number, limit: number): Observable<any> {
    const params = { page: page.toString(), limit: limit.toString() };
    return this.http.get<any>(`${this.apiUrl}/users`, { params });
  }

  inactivateUser(userId: string): Observable<any> {

    return this.http.put<any>(`${this.apiUrl}/users/InactivateFlag/${userId}`, {},);
  }

  activateUser(userId: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/ActivateFlag/${userId}`, {});
  }

  updateUser(user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/${user._id}`, user);
  }

  getOrdersByUserId(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/orders/AllOrdersByUser/${userId}`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users`, user);
  }

  searchUsers(criteria: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/search-users`, criteria);
  }

  createOrder(order: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/orders`, order);
  }


  getUsersByFiltration(user: any, page: number, limit: number): Observable<any> {

    // Convertir el objeto user en query parameters
    const params = new HttpParams({ fromObject: user });

    return this.http.get<any>(`${this.apiUrl}/users/usersByFiltration`, { params });
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