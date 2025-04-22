import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleClinicComponent } from './single-clinic.component';

describe('SingleClinicComponent', () => {
  let component: SingleClinicComponent;
  let fixture: ComponentFixture<SingleClinicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleClinicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleClinicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
