import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginFormComponent } from './login-form.component';
import { TranslateModule } from '@ngx-translate/core';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginFormComponent,
        TranslateModule.forRoot()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // trigger ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with submitDisabled = true', () => {
    expect(component.submitDisabled).toBeTrue();
  });

  it('should reset loginError on form value change', () => {
    component.loginError = 'Some error';
    component.ngOnInit(); // riattiva la subscription (già attiva in realtà)

    component.loginForm.controls['username'].setValue('testuser');
    fixture.detectChanges();

    expect(component.loginError).toBeNull();
  });

  it('should set submitDisabled = false if form becomes valid', () => {
    component.loginForm.controls['username'].setValue('validuser');
    component.loginForm.controls['password'].setValue('validpass');
    fixture.detectChanges();

    expect(component.loginForm.valid).toBeTrue();
    expect(component.submitDisabled).toBeFalse();
  });

  it('should set submitDisabled = true if loginError is present on ngOnChanges', () => {
    component.loginError = 'Invalid credentials';
    component.ngOnChanges(); // simula @Input modificato

    expect(component.submitDisabled).toBeTrue();
  });

  it('should mark all as touched if form is invalid on submit', () => {
    spyOn(component.loginForm, 'markAllAsTouched');
    component.onSubmit();

    expect(component.loginForm.markAllAsTouched).toHaveBeenCalled();
  });

  it('should emit loginSubmit with valid credentials on valid submit', () => {
    spyOn(component.loginSubmit, 'emit');

    component.loginForm.controls['username'].setValue('admin');
    component.loginForm.controls['password'].setValue('secret');
    fixture.detectChanges();

    component.onSubmit();

    expect(component.loginSubmit.emit).toHaveBeenCalledWith({
      UserName: 'admin',
      PassWord: 'secret'
    });
  });
});
