import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatLine } from '@angular/material/core';
import { MatListItem } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar-item',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatListItem, MatLine, MatIcon],
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.scss'
})
export class SidebarItemComponent {
  @Input() route!: string;
  @Input() icon!: string;
  @Input() label!: string;
  @Output() clicked = new EventEmitter<void>();
}
