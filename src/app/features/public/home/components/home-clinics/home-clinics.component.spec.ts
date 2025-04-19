import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeClinicsComponent,  } from './home-clinics.component';

describe('HomeClinicsComponent', () => {
  let component: HomeClinicsComponent;
  let fixture: ComponentFixture<HomeClinicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeClinicsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeClinicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
