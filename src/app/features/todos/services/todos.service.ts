import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { TODOS_API_URL_TOKEN } from '../todos.config';
import { Todo } from '../models/todo';
import { TodoDto } from '../dtos/todo.dto';
import { PageResponse } from '../../../shared/dtos/page-response.dto';
import { PageableQuery } from '../../../shared/interfaces/pageable-query.interface';

@Injectable()
export class TodosService {
  constructor(
    private readonly http: HttpClient,
    @Inject(TODOS_API_URL_TOKEN) private readonly apiUrl: string
  ) {}

  create(todo: Todo): Observable<Todo> {
    return this.http.post<TodoDto>(`${this.apiUrl}`, todo.toDto()).pipe(
      map(dto => Todo.fromDto(dto))
    );
  }

  readAll(query?: PageableQuery): Observable<PageResponse<Todo>> {
    const params: HttpParams = this.createPagingHttpParams(query);
    return this.http.get<PageResponse<TodoDto>>(`${this.apiUrl}`, { params }).pipe(
      map(pagedDtos => PageResponse.map(pagedDtos, dto => Todo.fromDto(dto)))
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

  readAllPending(query?: PageableQuery): Observable<PageResponse<Todo>> {
    const params: HttpParams  = this.createPagingHttpParams(query);
    return this.http.get<PageResponse<TodoDto>>(`${this.apiUrl}/pending`, { params }).pipe(
      map(pagedDtos => PageResponse.map(pagedDtos, dto => Todo.fromDto(dto)))
    );
  }

  readAllCompleted(query?: PageableQuery): Observable<PageResponse<Todo>> {
    const params: HttpParams  = this.createPagingHttpParams(query);
    return this.http.get<PageResponse<TodoDto>>(`${this.apiUrl}/completed`, { params }).pipe(
      map(pagedDtos => PageResponse.map(pagedDtos, dto => Todo.fromDto(dto)))
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

  private createPagingHttpParams(query?: PageableQuery): HttpParams {
    let params = new HttpParams();
    if (query?.page != null) params = params.set('page', query.page.toString());
    if (query?.size != null) params = params.set('size', query.size.toString());
    if (query?.sort) params = params.set('sort', query.sort);
    return params;
  }
}
