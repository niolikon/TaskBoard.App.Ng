import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoEditFormComponent } from './todo-edit-form.component';
import { TranslateModule } from '@ngx-translate/core';
import {provideNativeDateAdapter} from '@angular/material/core';

describe('TodoEditFormComponent', () => {
  let component: TodoEditFormComponent;
  let fixture: ComponentFixture<TodoEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TodoEditFormComponent,
        TranslateModule.forRoot()
      ],
      providers: [
        provideNativeDateAdapter()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
