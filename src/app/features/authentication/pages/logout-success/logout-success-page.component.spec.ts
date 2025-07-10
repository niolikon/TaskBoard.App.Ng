import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LogoutSuccessPageComponent } from './logout-success-page.component';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

describe('LogoutSuccessPageComponent', () => {
  let component: LogoutSuccessPageComponent;
  let fixture: ComponentFixture<LogoutSuccessPageComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        LogoutSuccessPageComponent,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LogoutSuccessPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home after 2 seconds', fakeAsync(() => {
    component.ngOnInit();
    tick(2000);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  }));
});
