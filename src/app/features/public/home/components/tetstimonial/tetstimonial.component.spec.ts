import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TetstimonialComponent } from './tetstimonial.component';

describe('TetstimonialComponent', () => {
  let component: TetstimonialComponent;
  let fixture: ComponentFixture<TetstimonialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TetstimonialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TetstimonialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
