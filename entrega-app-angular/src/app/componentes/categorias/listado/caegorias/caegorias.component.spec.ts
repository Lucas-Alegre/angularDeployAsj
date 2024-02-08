import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaegoriasComponent } from './caegorias.component';

describe('CaegoriasComponent', () => {
  let component: CaegoriasComponent;
  let fixture: ComponentFixture<CaegoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaegoriasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaegoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
