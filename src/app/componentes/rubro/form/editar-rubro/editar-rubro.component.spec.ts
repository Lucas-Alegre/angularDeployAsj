import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRubroComponent } from './editar-rubro.component';

describe('EditarRubroComponent', () => {
  let component: EditarRubroComponent;
  let fixture: ComponentFixture<EditarRubroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarRubroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarRubroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
