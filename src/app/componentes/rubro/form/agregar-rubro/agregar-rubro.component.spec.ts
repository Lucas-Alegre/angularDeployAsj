import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarRubroComponent } from './agregar-rubro.component';

describe('AgregarRubroComponent', () => {
  let component: AgregarRubroComponent;
  let fixture: ComponentFixture<AgregarRubroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarRubroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarRubroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
