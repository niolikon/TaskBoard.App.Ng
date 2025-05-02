import { Component, EventEmitter, Output } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { AuthenticationStateService } from '../../../security';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AsyncPipe, NgComponentOutlet, NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable} from 'rxjs';

@Component({
  selector: 'app-topbar',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    NgForOf,
    NgIf,
    AsyncPipe,
    RouterLink,
    NgComponentOutlet,
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  @Output() menuToggle = new EventEmitter<void>();

  isTopbarActionsEnabled$: Observable<boolean>;

  constructor(
    public navigationService: NavigationService,
    public authenticationStateService: AuthenticationStateService
  ) {
    this.isTopbarActionsEnabled$ = this.authenticationStateService.isAuthenticated$;
  }
}
