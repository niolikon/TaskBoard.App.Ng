import { Component, Input } from '@angular/core';
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: 'app-message-card',
  imports: [
      MatCardModule
  ],
  templateUrl: './message-card.component.html',
  styleUrl: './message-card.component.scss'
})
export class MessageCardComponent {
  @Input({ required: true }) messageText!: string;
}
