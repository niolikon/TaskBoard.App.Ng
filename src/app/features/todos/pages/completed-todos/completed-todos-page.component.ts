import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { Todo } from '../../models/todo';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TodoPreviewComponent } from '../../components/todo-preview/todo-preview.component';
import { TodoEditPageComponent } from '../todo-edit/todo-edit-page.component';
import { ConfirmationDialogComponent } from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe, CommonModule, NgForOf } from '@angular/common';
import { BehaviorSubject, finalize } from 'rxjs';
import { SuccessSnackbarComponent } from '../../../../shared/components/success-snackbar/success-snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { PageResponse } from '../../../../shared/dtos/page-response.dto';
import { PageableQuery } from '../../../../shared/interfaces/pageable-query.interface';
import {ErrorSnackbarComponent} from '../../../../shared/components/error-snackbar/error-snackbar.component';

@Component({
  selector: 'app-completed-todos-page',
  imports: [
    TodoPreviewComponent,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    CommonModule,
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './completed-todos-page.component.html',
  styleUrl: './completed-todos-page.component.scss'
})
export class CompletedTodosPageComponent implements OnInit {
  private readonly todosSubject = new BehaviorSubject<PageResponse<Todo>>(PageResponse.empty<Todo>());
  todos$ = this.todosSubject.asObservable();
  private latestQuery: PageableQuery = {};
  isLoading: boolean = true;
  isError: boolean = false;

  constructor(
    private readonly todoService: TodosService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
    private readonly translate: TranslateService) {
  }

  ngOnInit() {
    this.reloadPage();
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

        this.translate.get('TODOS__SUCCESS_SNACKBAR__UPDATE_SUCCESS_MESSAGE').subscribe(
          msg => {
            this.snackBar.openFromComponent(SuccessSnackbarComponent, {
              duration: 2000,
              data: { message: msg },
              panelClass: ['wa']
            });
          }
        );
      }
    });
  }

  openCompleteDialog($event: Todo) {
    this.translate.get([
      'TODOS__CONFIRMATION_DIALOG__COMPLETE_TODO_TITLE',
      'TODOS__CONFIRMATION_DIALOG__COMPLETE_TODO_MESSAGE'
    ]).subscribe(translations => {
      this.dialog.open(ConfirmationDialogComponent, {
        data: {
          title: translations['TODOS__CONFIRMATION_DIALOG__COMPLETE_TODO_TITLE'],
          message: translations['TODOS__CONFIRMATION_DIALOG__COMPLETE_TODO_MESSAGE']
        }
      }).afterClosed().subscribe(result => {
        if (result === true) {
          this.todoService.markCompleted($event)
            .subscribe({
              next: () => this.reloadPage(),
              error: _ => {
                this.translate.get('TODOS__ERROR_SNACKBAR__COMPLETE_ERROR_MESSAGE').subscribe(
                  msg => {
                    this.snackBar.openFromComponent(ErrorSnackbarComponent, {
                      duration: 2000,
                      data: { message: msg },
                      panelClass: ['wa']
                    });
                  }
                );
              }
            });
        }
      });
    });
  }

  openDeleteDialog(todo: Todo) {
    this.translate.get([
      'TODOS__CONFIRMATION_DIALOG__DELETE_TODO_TITLE',
      'TODOS__CONFIRMATION_DIALOG__DELETE_TODO_MESSAGE'
    ]).subscribe(translations => {
      this.dialog.open(ConfirmationDialogComponent, {
        data: {
          title: translations['TODOS__CONFIRMATION_DIALOG__DELETE_TODO_TITLE'],
          message: translations['TODOS__CONFIRMATION_DIALOG__DELETE_TODO_MESSAGE']
        }
      }).afterClosed().subscribe(result => {
        if (result === true) {
          this.todoService.delete(todo)
            .subscribe({
              next: () => this.reloadPage(),
              error: _ => {
                this.translate.get('TODOS__ERROR_SNACKBAR__DELETE_ERROR_MESSAGE').subscribe(
                  msg => {
                    this.snackBar.openFromComponent(ErrorSnackbarComponent, {
                      duration: 2000,
                      data: { message: msg },
                      panelClass: ['wa']
                    });
                  }
                );
              }
            });
        }
      });
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

    this.todoService.readAllCompleted(this.latestQuery)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(todos => this.todosSubject.next(todos));
  }
}
