import { ComponentFixture, TestBed } from '@angular/core/testing';

import {  ComplexLibrarySample } from './complex-library-sample';

describe('ComplexLibrarySample', () => {
  let component: ComplexLibrarySample;
  let fixture: ComponentFixture<ComplexLibrarySample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplexLibrarySample]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplexLibrarySample);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
