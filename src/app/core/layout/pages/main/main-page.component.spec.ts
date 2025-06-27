import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainPageComponent } from './main-page.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthenticationApiService } from '../../../security/services/authentication-api.service';
import { TokenStorageService } from '../../../security/services/token-storage.service';
import { AuthenticationStateService } from '../../../security';
import { AUTHENTICATION_MODULE_ROUTE_PATH } from '../../../../features/authentication/authentication.config';

// Component doubles
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

// Service doubles
const dummyAuthenticationApiService = {};
const dummyTokenStorageService = {};
const isAuthenticatedSubject = new Subject<boolean>();
const fakeAuthenticationStateService = {
  isAuthenticated$: isAuthenticatedSubject.asObservable()
};

const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
mockRouter.navigate.and.returnValue(Promise.resolve(true));

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
        { provide: AuthenticationApiService, useValue: dummyAuthenticationApiService },
        { provide: TokenStorageService, useValue: dummyTokenStorageService },
        { provide: AuthenticationStateService, useValue: fakeAuthenticationStateService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to "/" when not authenticated', () => {
    // Arrange
    fixture.detectChanges();

    // Act
    isAuthenticatedSubject.next(false);

    // Assert
    expect(mockRouter.navigate).toHaveBeenCalledWith([AUTHENTICATION_MODULE_ROUTE_PATH + '/login']);
  });
});
