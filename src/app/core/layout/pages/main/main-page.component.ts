import { Component, ViewChild, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { AuthenticationStateService } from '../../../security';
import {AUTHENTICATION_MODULE_ROUTE_PATH} from '../../../../features/authentication/authentication.config';

@Component({
  selector: 'app-main-page',
  imports: [
    MatSidenavModule,
    SidebarComponent,
    TopbarComponent,
    RouterOutlet,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer!: MatSidenav;
  @ViewChild('mainContent') mainContent!: ElementRef;

  private authSub!: Subscription;

  constructor(
    private readonly authenticationStateService: AuthenticationStateService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.authSub = this.authenticationStateService.isAuthenticated$.subscribe(isAuthenticated => {
      if (!isAuthenticated) {
        this.router.navigate([AUTHENTICATION_MODULE_ROUTE_PATH + '/login']).then(_ => {});
      }
    });
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
  }

  onSidebarLinkClicked() {
    this.drawer.close().then(_ =>
      this.mainContent.nativeElement.focus()
    );
  }
}
