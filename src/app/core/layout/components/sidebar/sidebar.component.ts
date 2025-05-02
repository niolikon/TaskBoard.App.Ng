import {
  Component, OnInit, AfterViewInit, ViewChild, EventEmitter, Output,
  ViewContainerRef, Injector
} from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { SidebarComponentItem } from '../../interfaces/sidebar-component-item';
import { MatNavList } from '@angular/material/list';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  imports: [
    MatNavList
  ],
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit, AfterViewInit {
  @Output() linkClicked = new EventEmitter<void>();
  @ViewChild('dynamicContainer', { read: ViewContainerRef })
  container!: ViewContainerRef;

  private sidebarItems: SidebarComponentItem[] = [];

  constructor(
    public navigationService: NavigationService,
    private readonly injector: Injector
  ) {}

  ngOnInit(): void {
    this.navigationService.sidebarComponentItems$.subscribe(items => {
      this.sidebarItems = items;
      this.renderDynamicComponents();
    });
  }

  ngAfterViewInit(): void {
    this.renderDynamicComponents();
  }

  private renderDynamicComponents(): void {
    if (!this.container) return;

    this.container.clear();

    for (const item of this.sidebarItems) {
      const ref = this.container.createComponent(item.component, {
        injector: this.injector
      });

      if (item.inputs) {
        for (const [key, value] of Object.entries(item.inputs)) {
          (ref.instance)[key] = value;
        }
      }

      const clicked = (ref.instance)['clicked'];
      if (clicked instanceof EventEmitter) {
        clicked.subscribe(() => this.onLinkClick());
      }

      ref.changeDetectorRef.detectChanges();
    }
  }

  onLinkClick(): void {
    this.linkClicked.emit();
  }
}
