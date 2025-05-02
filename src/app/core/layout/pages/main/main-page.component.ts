import {Component, ElementRef, ViewChild} from '@angular/core';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { RouterOutlet } from '@angular/router';

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
export class MainPageComponent {
  @ViewChild('drawer') drawer!: MatSidenav;
  @ViewChild('mainContent') mainContent!: ElementRef;

  onSidebarLinkClicked() {
    this.drawer.close().then(r =>
      this.mainContent.nativeElement.focus()
    );
  }
}
