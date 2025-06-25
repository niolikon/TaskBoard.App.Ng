import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopbarComponent } from './topbar.component';
import { of } from 'rxjs';
import {NavigationService} from '../../services/navigation.service';
import {AuthenticationStateService} from '../../../security';

// Mocks services
const navigationServiceStub = {};
const authenticationStateServiceStub = {
  isAuthenticated$: of(true)
};

describe('TopbarComponent', () => {
  let component: TopbarComponent;
  let fixture: ComponentFixture<TopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopbarComponent],
      providers: [
        { provide: NavigationService, useValue: navigationServiceStub },
        { provide: AuthenticationStateService, useValue: authenticationStateServiceStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
