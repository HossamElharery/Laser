import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountStep2Component } from './create-account-step2.component';

describe('CreateAccountStep2Component', () => {
  let component: CreateAccountStep2Component;
  let fixture: ComponentFixture<CreateAccountStep2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAccountStep2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAccountStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
