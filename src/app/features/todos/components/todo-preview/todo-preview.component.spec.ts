import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoPreviewComponent } from './todo-preview.component';
import { DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Todo } from '../../models/todo';
import { provideNativeDateAdapter } from '@angular/material/core';

describe('TodoPreviewComponent', () => {
  let component: TodoPreviewComponent;
  let fixture: ComponentFixture<TodoPreviewComponent>;

  const dummyTodo: Todo = new Todo(
    1,
    'Test title',
    'Test description',
    false,
    new Date('2025-01-01')
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TodoPreviewComponent,
        TranslateModule.forRoot()
      ],
      providers: [
        DatePipe,
        provideNativeDateAdapter()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoPreviewComponent);
    component = fixture.componentInstance;
    component.todo = dummyTodo;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit edit event on onEditClick()', () => {
    spyOn(component.edit, 'emit');
    component.onEditClick();
    expect(component.edit.emit).toHaveBeenCalledWith(dummyTodo);
  });

  it('should emit complete event on onCompleteClick()', () => {
    spyOn(component.complete, 'emit');
    component.onCompleteClick();
    expect(component.complete.emit).toHaveBeenCalledWith(dummyTodo);
  });

  it('should emit delete event on onDeleteClick()', () => {
    spyOn(component.delete, 'emit');
    component.onDeleteClick();
    expect(component.delete.emit).toHaveBeenCalledWith(dummyTodo);
  });
});
