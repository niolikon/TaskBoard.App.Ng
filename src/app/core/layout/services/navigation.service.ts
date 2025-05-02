import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SidebarComponentItem } from '../interfaces/sidebar-component-item';
import { TopbarAction } from '../interfaces/topbar-action.interface';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private readonly sidebarComponentItems = new BehaviorSubject<SidebarComponentItem[]>([]);
  private readonly topbarActions = new BehaviorSubject<TopbarAction[]>([]);

  sidebarComponentItems$ = this.sidebarComponentItems.asObservable();
  topbarActions$ = this.topbarActions.asObservable();

  registerSidebarComponents(components: SidebarComponentItem[]) {
    const current = this.sidebarComponentItems.getValue();
    const all = [...current, ...components];

    const deduped = Array.from(
      new Map(
        all.map(i => {
          const { label, route, icon } = i.inputs ?? {};
          const key = `${label}__${route}__${icon}`;
          return [key, i];
        })
      ).values()
    );

    this.sidebarComponentItems.next(deduped.sort((a, b) => a.order - b.order));
  }

  registerTopbarActions(actions: TopbarAction[]) {
    const current = this.topbarActions.getValue();
    const newActions = actions.filter(a => !current.some(c => c.route === a.route));
    this.topbarActions.next([...current, ...newActions]);
  }
}
