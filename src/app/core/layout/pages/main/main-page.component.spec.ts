import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainPageComponent } from './main-page.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Component } from '@angular/core';
import { AuthenticationApiService } from '../../../security/services/authentication-api.service';
import { TokenStorageService } from '../../../security/services/token-storage.service';
import { AuthenticationStateService } from '../../../security';

// Mock components
@Component({
  selector: 'app-sidebar',
  standalone: true,
  template: ''
})
class MockSidebarComponent {}

@Component({
  selector: 'app-topbar',
  standalone: true,
  template: ''
})
class MockTopbarComponent {}

// Mocks services
const mockAuthenticationApiService = {};
const mockTokenStorageService = {};
const mockAuthenticationStateService = {};

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MainPageComponent,
        MatSidenavModule,
        MockSidebarComponent,
        MockTopbarComponent
      ],
      providers: [
        { provide: AuthenticationApiService, useValue: mockAuthenticationApiService },
        { provide: TokenStorageService, useValue: mockTokenStorageService },
        { provide: AuthenticationStateService, useValue: mockAuthenticationStateService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
