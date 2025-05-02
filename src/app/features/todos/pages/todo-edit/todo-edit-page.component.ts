import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TodoEditFormComponent } from '../../components/todo-edit/todo-edit-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Todo } from '../../models/todo';
import { TodosService } from '../../services/todos.service';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-todo-edit-page',
  imports: [
    TodoEditFormComponent,
    MatIconModule,
    MatButtonModule,
    TranslatePipe
  ],
  templateUrl: './todo-edit-page.component.html',
  styleUrl: './todo-edit-page.component.scss'
})
export class TodoEditPageComponent {
  backendError: string | null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public todo: Todo,
    private readonly dialogRef: MatDialogRef<TodoEditPageComponent>,
    private readonly todosService: TodosService
  ) {
    this.backendError = null;
  }

  updateTodo(todo: Todo) {
    this.todosService.update(todo).subscribe({
      next: (success: Todo) => {
        this.backendError = null;
        this.dialogRef.close({updated: true, todo: success});
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
