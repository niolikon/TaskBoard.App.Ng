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
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe, CommonModule, NgForOf } from '@angular/common';
import { BehaviorSubject, finalize } from 'rxjs';
import { SuccessSnackbarComponent } from '../../../../shared/components/success-snackbar/success-snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslatePipe } from '@ngx-translate/core';
import { PageResponse } from '../../../../shared/dtos/page-response.dto';
import { PageableQuery } from '../../../../shared/interfaces/pageable-query.interface';

@Component({
  selector: 'app-pending-todos-page',
  imports: [
    TodoPreviewComponent,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    CommonModule,
    NgForOf,
    AsyncPipe,
    TranslatePipe
  ],
  templateUrl: './pending-todos-page.component.html',
  styleUrl: './pending-todos-page.component.scss'
})
export class PendingTodosPageComponent implements OnInit {
  private readonly todosSubject = new BehaviorSubject<PageResponse<Todo>>(PageResponse.empty<Todo>());
  todos$ = this.todosSubject.asObservable();
  private latestQuery: PageableQuery = {};
  isLoading: boolean = true;
  isError: boolean = false;

  constructor(
    private readonly todoService: TodosService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.reloadPage();
  }

  openInsertDialog() {
    const dialogRef = this.dialog.open(TodoInsertPageComponent, {
      width: '600px',
      maxWidth: '90vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.inserted) {
        this.reloadPage();

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
        this.reloadPage();

        this.snackBar.openFromComponent(SuccessSnackbarComponent, {
          duration: 2000,
          data: { message: 'Todo aggiornato con successo!' },
          panelClass: ['wa']
        });
      }
    });
  }

  openCompleteDialog($event: Todo) {
    this.dialog.open(ConfirmationDialogComponent, {
      data: { title: 'Completare il todo', message: 'Vuoi davvero segnare come completato questo todo?' }
    }).afterClosed().subscribe(result => {
      if (result === true) {
        this.todoService.markCompleted($event)
          .subscribe({
            next: () => this.reloadPage(),
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
            next: () => this.reloadPage(),
            error: err => {
              // TODO: find a way to handle this
            }
          });
      }
    });
  }

  handlePageEvent(event: PageEvent) {
    this.latestQuery = {
      page: event.pageIndex,
      size: event.pageSize
    };

    this.reloadPage();
  }

  reloadPage() {
    this.isLoading = true;
    this.isError = false;

    this.todoService.readAllPending(this.latestQuery)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(todos => this.todosSubject.next(todos));
  }
}
