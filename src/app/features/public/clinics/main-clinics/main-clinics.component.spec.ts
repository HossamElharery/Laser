import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainClinicsComponent } from './main-clinics.component';

describe('MainClinicsComponent', () => {
  let component: MainClinicsComponent;
  let fixture: ComponentFixture<MainClinicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainClinicsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainClinicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
