import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutSuccessPageComponent } from './logout-success-page.component';

describe('LogoutComponent', () => {
  let component: LogoutSuccessPageComponent;
  let fixture: ComponentFixture<LogoutSuccessPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoutSuccessPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoutSuccessPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
