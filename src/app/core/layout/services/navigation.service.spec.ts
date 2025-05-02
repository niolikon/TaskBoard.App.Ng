import { TestBed } from '@angular/core/testing';
import { NavigationService } from './navigation.service';
import { SidebarComponentItem } from '../interfaces/sidebar-component-item';
import { TopbarAction } from '../interfaces/topbar-action.interface';

describe('NavigationService', () => {
  let service: NavigationService;

  class DummySidebarComponent {}
  class DummyTopbarComponent {}

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavigationService]
    });

    service = TestBed.inject(NavigationService);
  });

  describe('registerSidebarComponents', () => {
    it('should emit deduplicated and sorted sidebar items by order', (done) => {
      // Arrange
      const sidebarItems: SidebarComponentItem[] = [
        {
          component: DummySidebarComponent,
          order: 2,
          inputs: { label: 'Settings', route: '/settings', icon: 'settings' }
        },
        {
          component: DummySidebarComponent,
          order: 1,
          inputs: { label: 'Home', route: '/home', icon: 'home' }
        },
        {
          component: DummySidebarComponent,
          order: 2,
          inputs: { label: 'Settings', route: '/settings', icon: 'settings' } // duplicate
        }
      ];

      // Act
      service.registerSidebarComponents([sidebarItems[0]]);
      service.registerSidebarComponents([sidebarItems[1], sidebarItems[2]]);

      // Assert
      service.sidebarComponentItems$.subscribe(result => {
        expect(result.length).toBe(2);
        expect(result[0].inputs?.['label']).toBe('Home');     // Sorted
        expect(result[1].inputs?.['label']).toBe('Settings');
        done();
      });
    });

    it('should consider label, route and icon as uniqueness keys', (done) => {
      // Arrange
      const item: SidebarComponentItem = {
        component: DummySidebarComponent,
        order: 1,
        inputs: { label: 'Reports', route: '/reports', icon: 'bar_chart' }
      };

      // Act
      service.registerSidebarComponents([item]);
      service.registerSidebarComponents([item]); // duplicate

      // Assert
      service.sidebarComponentItems$.subscribe(result => {
        expect(result.length).toBe(1);
        expect(result[0].inputs?.['label']).toBe('Reports');
        done();
      });
    });

    it('should not throw if inputs are undefined', (done) => {
      // Arrange
      const item: SidebarComponentItem = {
        component: DummySidebarComponent,
        order: 1
        // no inputs
      };

      // Act
      service.registerSidebarComponents([item]);

      // Assert
      service.sidebarComponentItems$.subscribe(result => {
        expect(result.length).toBe(1);
        expect(result[0].order).toBe(1);
        done();
      });
    });
  });

  describe('registerTopbarActions', () => {
    it('should emit all actions with unique routes', (done) => {
      // Arrange
      const actions: TopbarAction[] = [
        {
          route: '/profile',
          icon: 'person',
          tooltip: 'Profile',
          component: DummyTopbarComponent
        },
        {
          route: '/logout',
          icon: 'logout',
          tooltip: 'Logout',
          component: DummyTopbarComponent
        }
      ];

      // Act
      service.registerTopbarActions(actions);

      // Assert
      service.topbarActions$.subscribe(result => {
        expect(result.length).toBe(2);
        expect(result[0].route).toBe('/profile');
        expect(result[1].route).toBe('/logout');
        done();
      });
    });

    it('should avoid duplicates based on route', (done) => {
      // Arrange
      const initial: TopbarAction = {
        route: '/logout',
        icon: 'logout',
        tooltip: 'Logout',
        component: DummyTopbarComponent
      };

      const duplicate: TopbarAction = {
        route: '/logout',
        icon: 'exit_to_app',
        tooltip: 'Sign out',
        component: DummyTopbarComponent
      };

      // Act
      service.registerTopbarActions([initial]);
      service.registerTopbarActions([duplicate]);

      // Assert
      service.topbarActions$.subscribe(result => {
        expect(result.length).toBe(1);
        expect(result[0].tooltip).toBe('Logout');
        done();
      });
    });

    it('should register action without route', (done) => {
      // Arrange
      const action: TopbarAction = {
        icon: 'bell',
        tooltip: 'Notifications',
        component: DummyTopbarComponent
      };

      // Act
      service.registerTopbarActions([action]);

      // Assert
      service.topbarActions$.subscribe(result => {
        expect(result.length).toBe(1);
        expect(result[0].icon).toBe('bell');
        done();
      });
    });
  });
});
