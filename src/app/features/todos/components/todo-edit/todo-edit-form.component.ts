import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { dateNotInPastValidator } from '../../../../shared/validators/dateNotInPast.validator';
import { Todo } from '../../models/todo';
import { NgIf } from '@angular/common';

// Angular Material components
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-todo-edit',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    NgIf,
    TranslateModule,
  ],
  templateUrl: './todo-edit-form.component.html',
  styleUrl: './todo-edit-form.component.scss'
})
export class TodoEditFormComponent implements OnInit, OnChanges {
  @Input() todo?: Todo | null;
  @Output() todoSubmit: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Input({ required: true }) backendError: string | null;
  todoForm: FormGroup;
  todoFormInitialValue: any;
  submitDisabled: boolean;

  constructor(
    private readonly fb: FormBuilder
  ) {
    const nowInMillis = (new Date()).getTime();
    const oneDayInMillis = 1000 * 60 * 60 * 24;

    const defaultDate = new Date(nowInMillis + oneDayInMillis);

    this.todoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(250)]],
      dueDate: [defaultDate, [Validators.required, dateNotInPastValidator()]],
    });

    this.todoFormInitialValue = this.todoForm.value;
    this.submitDisabled = true;

    this.backendError = null;
  }

  private isTodoFormChanged(): boolean {
    if (!this.todoFormInitialValue) return true;

    const current = this.todoForm.value;

    return (
      current.title !== this.todoFormInitialValue.title ||
      current.description !== this.todoFormInitialValue.description ||
      new Date(current.dueDate).getDate() !== new Date(this.todoFormInitialValue.dueDate).getDate()
    );
  }

  ngOnInit() {
    this.todoForm.valueChanges.subscribe(() => {
      if (this.backendError) {
        this.backendError = null;
      }

      this.submitDisabled = this.todoForm.invalid || (!this.isTodoFormChanged);
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['todo']) {
      if (this.todo) {
        this.todoFormInitialValue = {
          title: this.todo.title,
          description: this.todo.description,
          dueDate: this.todo.dueDate
        };
      }

      this.todoForm.setValue(this.todoFormInitialValue);
      this.submitDisabled = true;
    }

    if (this.backendError) {
      this.submitDisabled = true;
    }
  }

  get title(): AbstractControl<any,any>  {
    return this.todoForm.get('title')!;
  }

  get description(): AbstractControl<any,any>   {
    return this.todoForm.get('description')!;
  }

  get dueDate(): AbstractControl<any,any>   {
    return this.todoForm.get('dueDate')!;
  }

  onSubmit() {
    if (this.todoForm.invalid) {
      this.todoForm.markAllAsTouched();
      return;
    }

    const formValue = this.todoForm.value;

    const result = new Todo(
      this.todo?.id,
      formValue.title,
      formValue.description,
      this.todo?.isCompleted ?? false,
      formValue.dueDate,
    );

    this.todoSubmit.emit(result);
  }

  onCancel() {
    this.todoForm.setValue(this.todoFormInitialValue);
    this.submitDisabled = true;
  }
}
