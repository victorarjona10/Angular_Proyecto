import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpHandlerFn } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';


export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
    const router = inject(Router); // Inyecta el Router manualmente
    const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
  
    // Si el token existe, agrégalo al encabezado de la solicitud
    if (token) {
        console.log('Token encontrado:', token); // Muestra el token en la consola
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
  
    return next(req).pipe(
      catchError((error) => {
        // Si el token ha caducado o no es válido, redirige al login
        if (error.status === 401) {
          console.error('Token caducado o no válido. Redirigiendo al login.');
          localStorage.removeItem('token'); // Elimina el token caducado
          router.navigate(['/401']); // Redirige al login
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