import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginSuccessPageComponent } from './login-success-page.component';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({ selector: 'app-message-card', template: '' })
class MockMessageCardComponent {}

describe('LoginSuccessPageComponent', () => {
  let component: LoginSuccessPageComponent;
  let fixture: ComponentFixture<LoginSuccessPageComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [
        LoginSuccessPageComponent,
        MockMessageCardComponent,
        TranslatePipe
      ],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginSuccessPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to root after 2 seconds', fakeAsync(() => {
    // Act
    component.ngOnInit();
    tick(2000);

    // Assert
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  }));
});
