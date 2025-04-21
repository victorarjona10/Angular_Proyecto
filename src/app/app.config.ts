import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/interceptor';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Configura tus rutas aquí
    provideHttpClient(withInterceptors([authInterceptor])), // Agrega el interceptor aquí
    provideZoneChangeDetection({ eventCoalescing: true }), // Optimización de detección de cambios
    importProvidersFrom(HttpClientModule) // Importa HttpClientModule si es necesario
  ]
};