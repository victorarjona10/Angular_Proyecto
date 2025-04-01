import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtiquetaMin1Component } from './etiqueta-min1.component';

describe('EtiquetaMin1Component', () => {
  let component: EtiquetaMin1Component;
  let fixture: ComponentFixture<EtiquetaMin1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtiquetaMin1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtiquetaMin1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
