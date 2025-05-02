import { Component } from '@angular/core';
import { TodoEditFormComponent } from '../../components/todo-edit/todo-edit-form.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Todo } from '../../models/todo';
import { TodosService } from '../../services/todos.service';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-todo-insert-page',
  imports: [
    TodoEditFormComponent,
    MatIconModule,
    MatButtonModule,
    TranslatePipe
  ],
  templateUrl: './todo-insert-page.component.html',
  styleUrl: './todo-insert-page.component.scss'
})
export class TodoInsertPageComponent {
  backendError: string | null;

  constructor(
    private readonly dialogRef: MatDialogRef<TodoInsertPageComponent>,
    private readonly todosService: TodosService
  ) {
    this.backendError = null;
  }

  insertTodo(todo: Todo) {
    this.todosService.create(todo).subscribe({
      next: (success: Todo) => {
        this.backendError = null;
        this.dialogRef.close({inserted: true, todo: success});
      },
      error: (error) => {
        this.backendError = error.error.message;
      }
    });
  }

  closeDialog() {
    this.dialogRef.close({inserted: false});
  }
}
