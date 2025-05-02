import { Type } from '@angular/core';

export interface TopbarAction {
  component?: Type<any>
  icon?: string;
  route?: string;
  tooltip?: string;
}
