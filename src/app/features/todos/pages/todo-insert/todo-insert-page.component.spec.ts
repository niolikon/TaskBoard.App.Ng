import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNativeDateAdapter } from '@angular/material/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TodoInsertPageComponent } from './todo-insert-page.component';
import { TodosService } from '../../services/todos.service';
import { of } from 'rxjs';

class FakeLoader {
  getTranslation(lang: string) {
    return of({});
  }
}

describe('TodoInsertPageComponent', () => {
  let component: TodoInsertPageComponent;
  let fixture: ComponentFixture<TodoInsertPageComponent>;
  let todosServiceSpy: jasmine.SpyObj<TodosService>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<TodoInsertPageComponent>>;

  beforeEach(async () => {
    todosServiceSpy = jasmine.createSpyObj('TodosService', ['create']);
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        TodoInsertPageComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: FakeLoader }
        })
      ],
      providers: [
        provideNativeDateAdapter(),
        { provide: TodosService, useValue: todosServiceSpy },
        { provide: MatDialogRef, useValue: dialogRefSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoInsertPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
