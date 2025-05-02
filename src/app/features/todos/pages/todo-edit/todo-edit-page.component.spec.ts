import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoEditPageComponent } from './todo-edit-page.component';

describe('TodoEditPageComponent', () => {
  let component: TodoEditPageComponent;
  let fixture: ComponentFixture<TodoEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoEditPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
