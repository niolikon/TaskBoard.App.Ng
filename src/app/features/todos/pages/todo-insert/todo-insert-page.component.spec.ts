import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoInsertPageComponent } from './todo-insert-page.component';

describe('TodoInsertPageComponent', () => {
  let component: TodoInsertPageComponent;
  let fixture: ComponentFixture<TodoInsertPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoInsertPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoInsertPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
