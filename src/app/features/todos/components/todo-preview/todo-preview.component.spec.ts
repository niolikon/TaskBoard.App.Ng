import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoPreviewComponent } from './todo-preview.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { Todo } from '../../models/todo';

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
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatTooltipModule
      ],
      declarations: [
        TodoPreviewComponent,
        TranslatePipe
      ],
      providers: [DatePipe]
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
    // Arrange
    spyOn(component.edit, 'emit');

    // Act
    component.onEditClick();

    // Assert
    expect(component.edit.emit).toHaveBeenCalledWith(dummyTodo);
  });

  it('should emit complete event on onCompleteClick()', () => {
    // Arrange
    spyOn(component.complete, 'emit');

    // Act
    component.onCompleteClick();

    // Assert
    expect(component.complete.emit).toHaveBeenCalledWith(dummyTodo);
  });

  it('should emit delete event on onDeleteClick()', () => {
    // Arrange
    spyOn(component.delete, 'emit');

    // Act
    component.onDeleteClick();

    // Assert
    expect(component.delete.emit).toHaveBeenCalledWith(dummyTodo);
  });
});
