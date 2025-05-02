import { Routes } from '@angular/router';
import { AuthenticationGuard } from './core/security';
import { AUTHENTICATION_MODULE_ROUTE_PATH } from './features/authentication/authentication.config';
import { TODOS_MODULE_ROUTE_PATH } from './features/todos/todos.config';

export const routes: Routes = [
  {
    path: AUTHENTICATION_MODULE_ROUTE_PATH,
    loadChildren: () =>
      import('./features/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: TODOS_MODULE_ROUTE_PATH,
    loadChildren: () =>
      import('./features/todos/todos.module').then(m => m.TodosModule),
    canActivate: [AuthenticationGuard],
    data: {redirectUnauthorizedTo: 'auth'}
  },
  {
    path: '',
    redirectTo: TODOS_MODULE_ROUTE_PATH,
    pathMatch: 'full'
  }
];
