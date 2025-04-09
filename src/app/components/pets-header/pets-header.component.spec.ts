import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsHeaderComponent } from './pets-header.component';

describe('PetsHeaderComponent', () => {
  let component: PetsHeaderComponent;
  let fixture: ComponentFixture<PetsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetsHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PetsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
