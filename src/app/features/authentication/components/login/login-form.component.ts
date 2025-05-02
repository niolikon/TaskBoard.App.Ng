import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { UserCredentials } from '../../../../core/security';
import { NgIf } from '@angular/common';

// Angular Material components
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgIf,
    TranslatePipe
  ],
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit, OnChanges {
  @Input({ required: true }) loginError: string | null;
  @Output() loginSubmit: EventEmitter<UserCredentials> = new EventEmitter<UserCredentials>();
  loginForm: FormGroup;
  submitDisabled: boolean;

  constructor(
    private readonly fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    });

    this.submitDisabled = true;

    this.loginError = null;
  }

  ngOnInit(): void {
    this.loginForm.valueChanges.subscribe(() => {
      if (this.loginError) {
        this.loginError = null;
      }

      this.submitDisabled = !this.loginForm.valid;
    });
  }

  ngOnChanges(): void {
    if (this.loginError) {
      this.submitDisabled = true;
    }
  }

  get username(): AbstractControl<any,any>  {
    return this.loginForm.get('username')!;
  }

  get password(): AbstractControl<any,any>   {
    return this.loginForm.get('password')!;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginForm.value;
    const userCredentials: UserCredentials = {
      UserName: username,
      PassWord: password
    };

    this.loginSubmit.emit(userCredentials);
  }
}
