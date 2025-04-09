import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bb8ToggleComponent } from './bb8-toggle.component';

describe('Bb8ToggleComponent', () => {
  let component: Bb8ToggleComponent;
  let fixture: ComponentFixture<Bb8ToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bb8ToggleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bb8ToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
