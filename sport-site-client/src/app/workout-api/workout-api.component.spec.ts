import { ComponentFixture, TestBed } from '@angular/core/testing';

import {  WorkoutApiComponent } from './workout-api.component';

describe('WorkoutApiComponent', () => {
  let component: WorkoutApiComponent;
  let fixture: ComponentFixture<WorkoutApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutApiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
