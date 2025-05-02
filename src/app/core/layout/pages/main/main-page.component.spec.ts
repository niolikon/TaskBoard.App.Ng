import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainPageComponent } from './main-page.component';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { Component, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({ selector: 'app-sidebar', template: '' })
class MockSidebarComponent {}

@Component({ selector: 'app-topbar', template: '' })
class MockTopbarComponent {}

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MainPageComponent,
        MockSidebarComponent,
        MockTopbarComponent,
        RouterOutlet
      ],
      imports: [MatSidenavModule]
    }).compileComponents();

    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;

    // Mock manuale dei ViewChild
    component.drawer = {
      close: jasmine.createSpy().and.returnValue(Promise.resolve(true))
    } as any as MatSidenav;

    component.mainContent = {
      nativeElement: {
        focus: jasmine.createSpy()
      }
    } as ElementRef;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the drawer and focus mainContent on sidebar link click', async () => {
    // Act
    await component.onSidebarLinkClicked();

    // Assert
    expect(component.drawer.close).toHaveBeenCalled();
    expect(component.mainContent.nativeElement.focus).toHaveBeenCalled();
  });
});
