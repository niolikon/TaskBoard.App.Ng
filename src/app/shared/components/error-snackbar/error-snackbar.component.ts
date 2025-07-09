import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-error-snackbar',
  imports: [
    MatIconModule,
    MatButtonModule,
    TranslatePipe
  ],
  templateUrl: './error-snackbar.component.html',
  styleUrl: './error-snackbar.component.scss'
})
export class ErrorSnackbarComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: { message: string },
    private readonly snackBarRef: MatSnackBarRef<ErrorSnackbarComponent>
  ) {}

  close(): void {
    this.snackBarRef.dismissWithAction();
  }
}
