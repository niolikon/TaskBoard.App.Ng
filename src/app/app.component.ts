import { Component } from '@angular/core';
import { MainPageComponent } from './core/layout/pages/main/main-page.component';

@Component({
  selector: 'app-root',
  imports: [
    MainPageComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'TaskBoard.App.Ng';
}
