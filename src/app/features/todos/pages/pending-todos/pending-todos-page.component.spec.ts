import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PendingTodosPageComponent } from './pending-todos-page.component';
import { TodosService } from '../../services/todos.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todo } from '../../models/todo';
import { PageResponse } from '../../../../shared/dtos/page-response.dto';
import { of } from 'rxjs';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

class FakeLoader {
  getTranslation(lang: string) {
    return of({});
  }
}

describe('PendingTodosPageComponent', () => {
  let component: PendingTodosPageComponent;
  let fixture: ComponentFixture<PendingTodosPageComponent>;
  let todosServiceSpy: jasmine.SpyObj<TodosService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  const dummyTodo = new Todo(1, 'Pending Test', 'Description', false, new Date('2025-01-01'));

  beforeEach(async () => {
    todosServiceSpy = jasmine.createSpyObj('TodosService', [
      'readAllPending',
      'markCompleted',
      'delete'
    ]);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['openFromComponent']);

    await TestBed.configureTestingModule({
      imports: [
        PendingTodosPageComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: FakeLoader }
        })
      ],
      providers: [
        { provide: TodosService, useValue: todosServiceSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PendingTodosPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should fetch and set pending todos', (done) => {
      const pageResponse = PageResponse.of([dummyTodo]);
      todosServiceSpy.readAllPending.and.returnValue(of(pageResponse));

      component.ngOnInit();

      component.todos$.subscribe(todos => {
        expect(todos).toEqual(pageResponse);
        done();
      });

      expect(todosServiceSpy.readAllPending).toHaveBeenCalledWith({});
    });
  });
});
