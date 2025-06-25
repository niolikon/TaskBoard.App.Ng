import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TodosService } from './todos.service';
import { TODOS_API_URL_TOKEN } from '../todos.config';
import { Todo } from '../models/todo';
import { TodoDto } from '../dtos/todo.dto';

describe('TodosService', () => {
  let service: TodosService;
  let httpMock: HttpTestingController;

  const apiUrl = '/api/todos';
  const dummyDto: TodoDto = {
    Id: 1,
    Title: 'Test',
    Description: 'Test description',
    IsCompleted: false,
    DueDate: new Date('2025-01-01')
  };

  const dummyTodo = Todo.fromDto(dummyDto);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TodosService,
        { provide: TODOS_API_URL_TOKEN, useValue: apiUrl }
      ]
    });

    service = TestBed.inject(TodosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('create', () => {
    it('should send POST request and return mapped Todo', () => {
      // Arrange
      const todo = dummyTodo;

      // Act
      service.create(todo).subscribe(result => {
        expect(result).toEqual(dummyTodo);
      });

      // Assert
      const req = httpMock.expectOne(`${apiUrl}`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(todo.toDto());
      req.flush(dummyDto);
    });
  });

  describe('readAll', () => {
    it('should send GET request and return list of mapped Todos', () => {
      // Arrange
      const dtos: TodoDto[] = [dummyDto];

      // Act
      service.readAll().subscribe(result => {
        expect(result).toEqual([dummyTodo]);
      });

      // Assert
      const req = httpMock.expectOne(`${apiUrl}`);
      expect(req.request.method).toBe('GET');
      req.flush(dtos);
    });
  });

  describe('read', () => {
    it('should send GET request by id and return mapped Todo', () => {
      // Arrange
      const id = 1;

      // Act
      service.read(id).subscribe(result => {
        expect(result).toEqual(dummyTodo);
      });

      // Assert
      const req = httpMock.expectOne(`${apiUrl}/${id}`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyDto);
    });
  });

  describe('update', () => {
    it('should send PUT request and return updated mapped Todo', () => {
      // Arrange
      const updatedTodo = dummyTodo;

      // Act
      service.update(updatedTodo).subscribe(result => {
        expect(result).toEqual(dummyTodo);
      });

      // Assert
      const req = httpMock.expectOne(`${apiUrl}/${updatedTodo.id}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updatedTodo.toDto());
      req.flush(dummyDto);
    });
  });

  describe('readAllPending', () => {
    it('should send GET request to /pending and return list of mapped Todos', () => {
      // Arrange
      const dtos: TodoDto[] = [dummyDto];

      // Act
      service.readAllPending().subscribe(result => {
        expect(result).toEqual([dummyTodo]);
      });

      // Assert
      const req = httpMock.expectOne(`${apiUrl}/pending`);
      expect(req.request.method).toBe('GET');
      req.flush(dtos);
    });
  });

  describe('markCompleted', () => {
    it('should send PATCH request to mark todo as completed and return updated Todo', () => {
      // Arrange
      const todo = dummyTodo;

      // Act
      service.markCompleted(todo).subscribe(result => {
        expect(result).toEqual(dummyTodo);
      });

      // Assert
      const req = httpMock.expectOne(`${apiUrl}/${todo.id}`);
      expect(req.request.method).toBe('PATCH');
      expect(req.request.body).toEqual({ IsCompleted: true });
      req.flush(dummyDto);
    });
  });

  describe('delete', () => {
    it('should send DELETE request for given Todo', () => {
      // Arrange
      const todo = dummyTodo;

      // Act
      service.delete(todo).subscribe(result => {
        expect(result).toBeNull(); // void response
      });

      // Assert
      const req = httpMock.expectOne(`${apiUrl}/${todo.id}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null); // void response
    });
  });
});
