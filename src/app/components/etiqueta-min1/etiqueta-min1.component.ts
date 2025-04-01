import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-etiqueta-min1',
  templateUrl: './etiqueta-min1.component.html',
  styleUrls: ['./etiqueta-min1.component.css'],
})
export class EtiquetaMin1Component implements OnInit {
  etiqueta: any = {}; // Almacena los datos de la etiqueta

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadEtiqueta();
  }

  loadEtiqueta() {
    const etiquetaId = this.route.snapshot.paramMap.get('id'); // Obtener el ID de la etiqueta desde la URL
    if (etiquetaId) {
      this.apiService.getEtiquetaById(etiquetaId).subscribe({
        next: (data) => {
          this.etiqueta = data; // Guardar los datos de la etiqueta
        },
        error: (err) => {
          console.error('Error cargando la etiqueta', err);
        },
      });
    }
  }
  goBack() {
    window.history.back();
  }
}
