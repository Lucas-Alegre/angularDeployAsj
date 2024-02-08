import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditarProveedorComponent } from './form-editar-proveedor.component';

describe('FormEditarProveedorComponent', () => {
  let component: FormEditarProveedorComponent;
  let fixture: ComponentFixture<FormEditarProveedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormEditarProveedorComponent]
    });
    fixture = TestBed.createComponent(FormEditarProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
