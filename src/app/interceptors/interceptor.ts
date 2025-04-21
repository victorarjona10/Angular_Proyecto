import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpHandlerFn } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';



export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
    const http = inject(HttpClient); // Inyecta HttpClient manualmente
    const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
    const refreshToken = localStorage.getItem('refresh_token');
    console.log('Token encontrado:', refreshToken); // Muestra el token en la consola
    const router = inject(Router);
    // Si el token existe, agrégalo al encabezado de la solicitud
    if (token) {
        console.log('Token encontrado:', token); // Muestra el token en la consola
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    let isRefreshing = false;
    return next(req).pipe(
      catchError((error) => {
        // Si el token ha caducado o no es válido, redirige al login
        if (error.status === 401 && refreshToken && !isRefreshing) {
          isRefreshing = true;
          console.log('Token caducado. Intentando renovar el token...');
          return http.post<any>('http://localhost:4000/api/admins/auth/refresh', { refreshToken }).pipe(
          
            switchMap((response: { token: string; refreshToken: string }) => {
              console.log('Nuevo Access Token recibido:', response.token);
              isRefreshing = false;
              localStorage.setItem('access_token', response.token);
              localStorage.setItem('refresh_token', response.refreshToken);
  
              // Reintentar la solicitud original con el nuevo Access Token
              req = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${response.token}`
                }
              });
              return next(req);
            }),
            catchError((refreshError) => {
              console.error('Error al renovar el Access Token:', refreshError);
              isRefreshing = false;
              if (refreshError.status === 401 || refreshError.status === 403) {
                console.error('El Refresh Token ha caducado o es inválido.');
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                
                router.navigate(['/login']); // Redirigir al usuario al login
              }
  
              return throwError(() => refreshError);
            })
          );
        }   else if (error.status === 404) {
            // Redirigir a una página de error 404
            console.error('Recurso no encontrado. Redirigiendo a la página 404.');
            router.navigate(['/404']);
          } else if (error.status >= 500) {
            // Redirigir a una página de error genérico
            console.error('Error del servidor. Redirigiendo a la página de error.');
            router.navigate(['/error']);
          } else if (error.status === 401) {
            // Redirigir al componente de error 401
            console.error('Token caducado o no válido. Redirigiendo al error 401.');
            localStorage.removeItem('token'); // Elimina el token caducado
            router.navigate(['/401']);
          }
        return throwError(() => error);
      })
    );
  };