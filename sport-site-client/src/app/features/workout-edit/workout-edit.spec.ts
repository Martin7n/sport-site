import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutEdit } from './workout-edit';

describe('WorkoutEdit', () => {
  let component: WorkoutEdit;
  let fixture: ComponentFixture<WorkoutEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
