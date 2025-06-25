import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthenticationApiService } from './core/security/services/authentication-api.service';
import { AuthenticationStateService } from './core/security';
import { TokenStorageService } from './core/security/services/token-storage.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  template: '<p>Mock Main Page</p>',
})
class MockMainPageComponent {}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, MockMainPageComponent],
      providers: [
        // Mocks vuoti o spy
        { provide: AuthenticationApiService, useValue: {} },
        { provide: TokenStorageService, useValue: {} },
        { provide: AuthenticationStateService, useValue: {
            isAuthenticated$: { subscribe: () => {} },
            logout: () => {}
          }},
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'TaskBoard.App.Ng' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('TaskBoard.App.Ng');
  });
});
