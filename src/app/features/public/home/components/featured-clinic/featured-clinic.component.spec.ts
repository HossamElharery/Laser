import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedClinicComponent } from './featured-clinic.component';

describe('FeaturedClinicComponent', () => {
  let component: FeaturedClinicComponent;
  let fixture: ComponentFixture<FeaturedClinicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedClinicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedClinicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
