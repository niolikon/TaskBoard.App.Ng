import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginSuccessPageComponent } from './login-success-page.component';
import { Router } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { of } from 'rxjs';

class FakeLoader {
  getTranslation(lang: string) {
    return of({});
  }
}

describe('LoginSuccessPageComponent', () => {
  let component: LoginSuccessPageComponent;
  let fixture: ComponentFixture<LoginSuccessPageComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockRouter.navigate.and.returnValue(Promise.resolve(true));

    await TestBed.configureTestingModule({
      imports: [
        LoginSuccessPageComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: FakeLoader }
        })
      ],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginSuccessPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home after 2 seconds', fakeAsync(() => {
    component.ngOnInit();
    tick(2000);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  }));
});
