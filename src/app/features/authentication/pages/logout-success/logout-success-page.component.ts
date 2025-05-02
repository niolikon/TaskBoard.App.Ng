import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageCardComponent } from '../../../../shared/components/message-card/message-card.component';

@Component({
  selector: 'app-logout-page',
  imports: [
    MessageCardComponent
  ],
  templateUrl: './logout-success-page.component.html',
  styleUrl: './logout-success-page.component.scss'
})
export class LogoutSuccessPageComponent implements OnInit {

  constructor(
    private readonly router: Router) {
  }

  ngOnInit(): void {
    setTimeout( () => this.router.navigate(['/']), 2000);
  }
}
