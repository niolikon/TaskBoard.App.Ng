import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TODOS_API_URL, TODOS_MODULE_ROUTE_PATH } from './todos.config';
import { environment } from '../../../environments/environment';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { CUSTOM_DATE_FORMATS } from '../../core/layout/formats/custom-date-formats';
import { TodosService } from './services/todos.service';
import { NavigationService } from '../../core/layout/services/navigation.service';
import { SidebarItemComponent } from '../../core/layout/components/sidebar-item/sidebar-item.component';
import { ReactiveFormsModule } from '@angular/forms';

// Module routes imports
import { TodosRoutingModule } from './todos-routing.module';

// Module defined pages imports
import { TodoPreviewComponent } from './components/todo-preview/todo-preview.component';

// Angular Material modules imports
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SuccessSnackbarComponent } from '../../shared/components/success-snackbar/success-snackbar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    // Module defined routes
    TodosRoutingModule,

    // Module defined pages
    TodoPreviewComponent,
    SuccessSnackbarComponent,

    // Angular Material modules
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [
    { provide: TODOS_API_URL, useValue: environment.todosApiUrl },
    TodosService,
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
  ]
})
export class TodosModule {
  constructor(navService: NavigationService) {
    navService.registerSidebarComponents([
      {
        component: SidebarItemComponent,
        order: 1,
        inputs: {
          label: 'Pending',
          route: TODOS_MODULE_ROUTE_PATH + '/pending',
          icon: 'pending_actions'
        }
      },
      {
        component: SidebarItemComponent,
        order: 2,
        inputs: {
          label: 'Completed',
          route: TODOS_MODULE_ROUTE_PATH + '/completed',
          icon: 'assignment_turned_in'
        }
      },
    ]);
  }
}
