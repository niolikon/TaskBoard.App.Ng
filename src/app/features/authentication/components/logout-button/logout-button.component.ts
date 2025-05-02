import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthenticationStateService } from '../../../../core/security';
import { ConfirmationDialogComponent } from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { AUTHENTICATION_MODULE_ROUTE_PATH } from '../../authentication.config';


@Component({
  selector: 'app-logout-button',
  template: `
    <button mat-icon-button matTooltip="Logout" (click)="confirmLogout()">
      <mat-icon>logout</mat-icon>
    </button>
  `,

  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
})
export class LogoutButtonComponent {
  constructor(
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly authService: AuthenticationStateService
  ) {}

  confirmLogout(): void {
    this.dialog.open(ConfirmationDialogComponent, {
      data: { title: 'Logout', message: 'Vuoi davvero uscire?' }
    }).afterClosed().subscribe(result => {
      if (result === true) {
        this.authService.logout()
          .subscribe({
            next: () => {
              this.router.navigate([AUTHENTICATION_MODULE_ROUTE_PATH + '/logout']);
            },
            error: err => {
              // TODO: find a way to handle this
            }
          });
      }
    });
  }
}
