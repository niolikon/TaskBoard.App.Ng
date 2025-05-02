import { Todo } from './todo';
import { TodoDto } from '../dtos/todo.dto';

describe('Todo', () => {

  describe('fromDto', () => {
    it('should correctly map a full TodoDto to a Todo instance', () => {
      // Arrange
      const dto: TodoDto = {
        Id: 1,
        Title: 'Test Title',
        Description: 'Test Description',
        IsCompleted: false,
        DueDate: new Date('2025-01-01')
      };

      // Act
      const todo = Todo.fromDto(dto);

      // Assert
      expect(todo.id).toBe(dto.Id);
      expect(todo.title).toBe(dto.Title);
      expect(todo.description).toBe(dto.Description);
      expect(todo.isCompleted).toBe(dto.IsCompleted);
      expect(todo.dueDate).toEqual(dto.DueDate);
    });

    it('should map null to id when Id is undefined in DTO', () => {
      // Arrange
      const dto: TodoDto = {
        Id: undefined,
        Title: 'No ID',
        Description: 'Missing Id',
        IsCompleted: false,
        DueDate: new Date('2025-01-01')
      };

      // Act
      const todo = Todo.fromDto(dto);

      // Assert
      expect(todo.id).toBeUndefined();
    });
  });

  describe('toDto', () => {
    it('should correctly map a Todo with id to TodoDto', () => {
      // Arrange
      const todo = new Todo(1, 'My Title', 'My Description', true, new Date('2025-02-01'));

      // Act
      const dto = todo.toDto();

      // Assert
      expect(dto.Id).toBe(1);
      expect(dto.Title).toBe(todo.title);
      expect(dto.Description).toBe(todo.description);
      expect(dto.IsCompleted).toBe(todo.isCompleted);
      expect(dto.DueDate).toEqual(todo.dueDate);
    });

    it('should NOT include Id field when Todo.id is null', () => {
      // Arrange
      const todo = new Todo(undefined, 'No ID', 'Test', false, new Date('2025-03-01'));

      // Act
      const dto = todo.toDto();

      // Assert
      expect(dto.Id).toBeUndefined();
      expect(dto.Title).toBe(todo.title);
      expect(dto.Description).toBe(todo.description);
      expect(dto.IsCompleted).toBe(todo.isCompleted);
      expect(dto.DueDate).toEqual(todo.dueDate);
    });
  });

  describe('isOverdue', () => {
    it('should return true if not completed and dueDate is in the past', () => {
      // Arrange
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);
      const todo = new Todo(1, 'Past Task', 'Overdue', false, pastDate);

      // Act
      const result = todo.isOverdue;

      // Assert
      expect(result).toBeTrue();
    });

    it('should return false if task is completed, even if dueDate is in the past', () => {
      // Arrange
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);
      const todo = new Todo(1, 'Done Task', 'Not overdue', true, pastDate);

      // Act
      const result = todo.isOverdue;

      // Assert
      expect(result).toBeFalse();
    });

    it('should return false if dueDate is in the future', () => {
      // Arrange
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);
      const todo = new Todo(1, 'Future Task', 'Not yet due', false, futureDate);

      // Act
      const result = todo.isOverdue;

      // Assert
      expect(result).toBeFalse();
    });
  });

  describe('EMPTY', () => {
    it('should have default empty values', () => {
      // Act
      const empty = Todo.EMPTY;

      // Assert
      expect(empty.id).toBeUndefined();
      expect(empty.title).toBe('');
      expect(empty.description).toBe('');
      expect(empty.isCompleted).toBeFalse();
    });
  });

});
