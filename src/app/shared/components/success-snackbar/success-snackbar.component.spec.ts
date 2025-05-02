import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuccessSnackbarComponent } from './success-snackbar.component';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { TranslatePipe } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

describe('SuccessSnackbarComponent', () => {
  let component: SuccessSnackbarComponent;
  let fixture: ComponentFixture<SuccessSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatButtonModule
      ],
      declarations: [SuccessSnackbarComponent, TranslatePipe],
      providers: [
        { provide: MAT_SNACK_BAR_DATA, useValue: { message: 'Test message' } },
        {
          provide: MatSnackBarRef,
          useValue: { dismissWithAction: jasmine.createSpy('dismissWithAction') }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SuccessSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call dismissWithAction when close is triggered', () => {
    const snackBarRef = TestBed.inject(MatSnackBarRef);
    component.close();
    expect(snackBarRef.dismissWithAction).toHaveBeenCalled();
  });
});
