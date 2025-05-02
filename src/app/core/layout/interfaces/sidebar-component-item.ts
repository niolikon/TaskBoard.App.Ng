import { Type } from '@angular/core';

export interface SidebarComponentItem {
  component: Type<any>;
  order: number;
  inputs?: Record<string, any>;
}
