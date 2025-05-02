import { Injectable, Inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { TODOS_API_URL_TOKEN } from '../todos.config';
import { Todo } from '../models/todo';
import { TodoDto } from '../dtos/todo.dto';

@Injectable()
export class TodosService {

  constructor(
    private readonly http: HttpClient,
    @Inject(TODOS_API_URL_TOKEN) private readonly apiUrl: string) {
  }

  create(todo: Todo): Observable<Todo> {
    return this.http.post<TodoDto>(`${this.apiUrl}`, todo.toDto()).pipe(
      map(dto => Todo.fromDto(dto))
    );
  }

  readAll(): Observable<Todo[]> {
    return this.http.get<TodoDto[]>(`${this.apiUrl}`).pipe(
      map(dtoList => dtoList.map(dto => Todo.fromDto(dto)))
    );
  }

  read(id: number): Observable<Todo> {
    return this.http.get<TodoDto>(`${this.apiUrl}/${id}`).pipe(
      map(dto => Todo.fromDto(dto))
    );
  }

  update(todo: Todo): Observable<Todo> {
    return this.http.put<TodoDto>(`${this.apiUrl}/${todo.id}`, todo.toDto()).pipe(
      map(dto => Todo.fromDto(dto))
    );
  }

  readAllPending(): Observable<Todo[]> {
    return this.http.get<TodoDto[]>(`${this.apiUrl}/pending`).pipe(
      map(dtoList => dtoList.map(dto => Todo.fromDto(dto)))
    );
  }

  readAllCompleted(): Observable<Todo[]> {
    return this.http.get<TodoDto[]>(`${this.apiUrl}/completed`).pipe(
      map(dtoList => dtoList.map(dto => Todo.fromDto(dto)))
    );
  }

  markCompleted(todo: Todo): Observable<Todo> {
    return this.http.patch<TodoDto>(`${this.apiUrl}/${todo.id}`, {IsCompleted: true}).pipe(
      map(dto => Todo.fromDto(dto))
    );
  }

  delete(todo: Todo): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${todo.id}`);
  }
}
