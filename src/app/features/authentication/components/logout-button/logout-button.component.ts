import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthenticationStateService } from '../../../../core/security';
import { ConfirmationDialogComponent } from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { AUTHENTICATION_MODULE_ROUTE_PATH } from '../../authentication.config';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  styleUrls: ['./logout-button.component.scss'],
})
export class LogoutButtonComponent {
  constructor(
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly translateService: TranslateService,
    private readonly authenticationStateService: AuthenticationStateService
  ) {}

  confirmLogout(): void {
    this.translateService.get([
      'AUTHENTICATION__LOGOUT_BUTTON_COMPONENT__CONFIRMATION_DIALOG_TITLE',
      'AUTHENTICATION__LOGOUT_BUTTON_COMPONENT__CONFIRMATION_DIALOG_MESSAGE'
      ]).subscribe(locales => {
        this.dialog.open(ConfirmationDialogComponent, {
          data: {
            title: locales['AUTHENTICATION__LOGOUT_BUTTON_COMPONENT__CONFIRMATION_DIALOG_TITLE'],
            message: locales['AUTHENTICATION__LOGOUT_BUTTON_COMPONENT__CONFIRMATION_DIALOG_MESSAGE']
          }
        }).afterClosed().subscribe(result => {
          if (result === true) {
            this.authenticationStateService.logout()
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
    });


  }
}
