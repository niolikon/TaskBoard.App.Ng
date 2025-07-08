import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CompletedTodosPageComponent } from './completed-todos-page.component';
import { TodosService } from '../../services/todos.service';
import { Todo } from '../../models/todo';
import { PageResponse } from '../../../../shared/dtos/page-response.dto';
import { of } from 'rxjs';

describe('CompletedTodosPageComponent', () => {
  let component: CompletedTodosPageComponent;
  let fixture: ComponentFixture<CompletedTodosPageComponent>;
  let todosServiceSpy: jasmine.SpyObj<TodosService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  const dummyTodo = new Todo(1, 'Test', 'Description', true, new Date('2025-01-01'));

  beforeEach(async () => {
    todosServiceSpy = jasmine.createSpyObj('TodosService', [
      'readAllCompleted',
      'markCompleted',
      'delete'
    ]);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['openFromComponent']);

    await TestBed.configureTestingModule({
      imports: [
        CompletedTodosPageComponent,
        MatDialogModule,
        TranslateModule.forRoot()
      ],
      providers: [
        provideNativeDateAdapter(),
        { provide: TodosService, useValue: todosServiceSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CompletedTodosPageComponent);
    component = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should fetch and set completed todos', (done) => {
      const pageResponse: PageResponse<Todo> = PageResponse.of([dummyTodo]);
      todosServiceSpy.readAllCompleted.and.returnValue(of(pageResponse));

      component.ngOnInit();

      component.todos$.subscribe(todos => {
        expect(todos).toEqual(pageResponse);
        done();
      });

      expect(todosServiceSpy.readAllCompleted).toHaveBeenCalledWith({});
    });
  });
});
