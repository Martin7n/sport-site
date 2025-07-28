import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComplex } from './create-complex';

describe('CreateComplexComponent', () => {
  let component: CreateComplex;
  let fixture: ComponentFixture<CreateComplexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateComplex]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateComplex);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
