import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedTodosPageComponent } from './completed-todos-page.component';

describe('AllTodosComponent', () => {
  let component: CompletedTodosPageComponent;
  let fixture: ComponentFixture<CompletedTodosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletedTodosPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedTodosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
