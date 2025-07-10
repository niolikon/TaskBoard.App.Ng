// Filter warning i18n
const originalWarn = console.warn;
console.warn = function (...args: any[]) {
  if (
    typeof args[0] === 'string' &&
    args[0].includes('Error loading i18n/')
  ) return;

  originalWarn.apply(console, args);
};

// Start Angular test environment
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
