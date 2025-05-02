import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
    const year = date.getFullYear();
    const month = this._to2digit(date.getMonth() + 1);
    const day = this._to2digit(date.getDate());

    return `${year}/${month}/${day}`;
  }

  private _to2digit(n: number): string {
    return n < 10 ? '0' + n : n.toString();
  }
}
