import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorSnackbarComponent } from './error-snackbar.component';

describe('ErrorSnackbarComponent', () => {
  let component: ErrorSnackbarComponent;
  let fixture: ComponentFixture<ErrorSnackbarComponent>;
  let snackBarRefSpy: jasmine.SpyObj<MatSnackBarRef<ErrorSnackbarComponent>>;

  const dummyData = { message: 'Test message' };

  beforeEach(async () => {
    snackBarRefSpy = jasmine.createSpyObj('MatSnackBarRef', ['dismissWithAction']);

    await TestBed.configureTestingModule({
      imports: [
        ErrorSnackbarComponent,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: MAT_SNACK_BAR_DATA, useValue: dummyData },
        { provide: MatSnackBarRef, useValue: snackBarRefSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorSnackbarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dismiss snackbar when close is called', () => {
    component.close();
    expect(snackBarRefSpy.dismissWithAction).toHaveBeenCalled();
  });

  it('should expose the message from data', () => {
    expect(component.data.message).toBe('Test message');
  });
});
