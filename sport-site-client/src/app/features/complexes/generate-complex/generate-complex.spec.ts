import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateComplex } from './generate-complex';

describe('GenerateComplex', () => {
  let component: GenerateComplex;
  let fixture: ComponentFixture<GenerateComplex>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateComplex]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateComplex);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
