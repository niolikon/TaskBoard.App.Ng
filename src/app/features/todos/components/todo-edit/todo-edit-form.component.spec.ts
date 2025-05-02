import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoEditFormComponent } from './todo-edit-form.component';

describe('TodoEditComponent', () => {
  let component: TodoEditFormComponent;
  let fixture: ComponentFixture<TodoEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoEditFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
