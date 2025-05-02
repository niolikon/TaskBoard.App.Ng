import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingTodosPageComponent } from './pending-todos-page.component';

describe('PendingTodosPageComponent', () => {
  let component: PendingTodosPageComponent;
  let fixture: ComponentFixture<PendingTodosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingTodosPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingTodosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
