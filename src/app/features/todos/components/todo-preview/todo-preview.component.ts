import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Todo } from '../../models/todo';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-todo-preview',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    DatePipe,
    TranslatePipe
  ],
  templateUrl: './todo-preview.component.html',
  styleUrl: './todo-preview.component.scss'
})
export class TodoPreviewComponent {
  @Input() todo!: Todo;
  @Output() edit = new EventEmitter<Todo>();
  @Output() complete = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<Todo>();

  onEditClick() {
    this.edit.emit(this.todo);
  }

  onCompleteClick() {
    this.complete.emit(this.todo);
  }

  onDeleteClick() {
    this.delete.emit(this.todo);
  }
}
