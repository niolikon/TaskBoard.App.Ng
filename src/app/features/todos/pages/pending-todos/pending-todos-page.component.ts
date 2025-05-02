import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { Todo } from '../../models/todo';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TodoPreviewComponent } from '../../components/todo-preview/todo-preview.component';
import { TodoEditPageComponent } from '../todo-edit/todo-edit-page.component';
import { TodoInsertPageComponent} from '../todo-insert/todo-insert-page.component';
import { ConfirmationDialogComponent } from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, NgForOf } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { SuccessSnackbarComponent } from '../../../../shared/components/success-snackbar/success-snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-pending-todos-page',
  imports: [
    TodoPreviewComponent,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    NgForOf,
    AsyncPipe,
    TranslatePipe
  ],
  templateUrl: './pending-todos-page.component.html',
  styleUrl: './pending-todos-page.component.scss'
})
export class PendingTodosPageComponent implements OnInit {
  private readonly todosSubject = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todosSubject.asObservable();

  constructor(
    private readonly todoService: TodosService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.todoService.readAllPending().subscribe(todos => this.todosSubject.next(todos));
  }

  openInsertDialog() {
    const dialogRef = this.dialog.open(TodoInsertPageComponent, {
      width: '600px',
      maxWidth: '90vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.inserted) {
        this.todosSubject.next([...this.todosSubject.getValue(), result.todo]);

        this.snackBar.openFromComponent(SuccessSnackbarComponent, {
          duration: 2000,
          data: { message: 'Todo creato con successo!' },
          panelClass: ['success-snackbar-container']
        });
      }
    });
  }

  openEditDialog(todo: Todo) {
    const dialogRef = this.dialog.open(TodoEditPageComponent, {
      data: todo,
      width: '600px',
      maxWidth: '90vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.updated) {
        const current = this.todosSubject.getValue();
        const index = current.findIndex(t => t.id === result.todo.id);
        const updated = [...current];
        updated[index] = result.todo;
        this.todosSubject.next(updated);

        this.snackBar.openFromComponent(SuccessSnackbarComponent, {
          duration: 2000,
          data: { message: 'Todo aggiornato con successo!' },
          panelClass: ['wa']
        });
      }
    });
  }

  private removeTodo(todo: Todo) {
    const current = this.todosSubject.getValue();
    const filtered = current.filter(t => t.id !== todo.id);
    this.todosSubject.next(filtered);
  }

  openCompleteDialog($event: Todo) {
    this.dialog.open(ConfirmationDialogComponent, {
      data: { title: 'Completare il todo', message: 'Vuoi davvero segnare come completato questo todo?' }
    }).afterClosed().subscribe(result => {
      if (result === true) {
        this.todoService.markCompleted($event)
          .subscribe({
            next: () => this.removeTodo($event),
            error: err => {
              // TODO: find a way to handle this
            }
          });
      }
    });
  }

  openDeleteDialog($event: Todo) {
    this.dialog.open(ConfirmationDialogComponent, {
      data: { title: 'Eliminare il todo', message: 'Vuoi davvero elimanre questo todo?' }
    }).afterClosed().subscribe(result => {
      if (result === true) {
        this.todoService.delete($event)
          .subscribe({
            next: () => this.removeTodo($event),
            error: err => {
              // TODO: find a way to handle this
            }
          });
      }
    });
  }
}
