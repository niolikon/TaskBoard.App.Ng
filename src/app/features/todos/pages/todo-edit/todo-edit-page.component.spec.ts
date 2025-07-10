import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { TodosService } from '../../services/todos.service';
import { TodoEditPageComponent } from './todo-edit-page.component';
import { TodoEditFormComponent } from '../../components/todo-edit/todo-edit-form.component';
import { Todo } from '../../models/todo';
import { of } from 'rxjs';

class FakeLoader {
  getTranslation(lang: string) {
    return of({});
  }
}

describe('TodoEditPageComponent', () => {
  let component: TodoEditPageComponent;
  let fixture: ComponentFixture<TodoEditPageComponent>;
  let todosServiceSpy: jasmine.SpyObj<TodosService>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<TodoEditPageComponent>>;

  const dummyTodo = new Todo(1, 'Test', 'Description', false, new Date('2025-01-01'));

  beforeEach(async () => {
    todosServiceSpy = jasmine.createSpyObj('TodosService', ['update']);
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        TodoEditPageComponent,
        TodoEditFormComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: FakeLoader }
        })
      ],
      providers: [
        provideNativeDateAdapter(),
        { provide: TodosService, useValue: todosServiceSpy },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: dummyTodo }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoEditPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
