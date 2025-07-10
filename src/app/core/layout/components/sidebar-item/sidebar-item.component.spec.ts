import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarItemComponent } from './sidebar-item.component';
import { ActivatedRoute } from '@angular/router';

describe('SidebarItemComponent', () => {
  let component: SidebarItemComponent;
  let fixture: ComponentFixture<SidebarItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarItemComponent],
      providers: [
        { provide: ActivatedRoute, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarItemComponent);
    component = fixture.componentInstance;

    component.route = '/dashboard';
    component.icon = 'home';
    component.label = 'Dashboard';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
