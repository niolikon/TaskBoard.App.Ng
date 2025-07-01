import {AfterViewInit, Component, ElementRef, Inject, ViewChild} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  imports: [
    MatDialogModule,
    MatButtonModule,
    TranslateModule
  ],
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent implements AfterViewInit {
  @ViewChild('cancelButton') cancelButton!: ElementRef<HTMLButtonElement>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string },
    private readonly dialogRef: MatDialogRef<ConfirmationDialogComponent>
  ) {}

  ngAfterViewInit(): void {
    this.cancelButton.nativeElement.focus();
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
