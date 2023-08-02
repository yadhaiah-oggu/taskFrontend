import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUserTasksComponent } from './all-user-tasks.component';

describe('AllUserTasksComponent', () => {
  let component: AllUserTasksComponent;
  let fixture: ComponentFixture<AllUserTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllUserTasksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllUserTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
