import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { TODOS_API_URL_TOKEN, TODOS_API_PATH, TODOS_MODULE_ROUTE_PATH } from './todos.config';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { CUSTOM_DATE_FORMATS } from '../../core/layout/formats/custom-date-formats';
import { TodosService } from './services/todos.service';
import { NavigationService } from '../../core/layout/services/navigation.service';
import { SidebarItemComponent } from '../../core/layout/components/sidebar-item/sidebar-item.component';
import { FeatureLocalizationLoaderService } from '../../core/i18n/services/feature-localization-loader.service';
import { TranslateService } from '@ngx-translate/core';
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
    {
      provide: TODOS_API_URL_TOKEN,
      useValue: environment.apiBaseUrl + TODOS_API_PATH
    },
    TodosService,
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
  ]
})
export class TodosModule {
  constructor(
    navigationService: NavigationService,
    translate: TranslateService,
    featureLocalizationLoaderService: FeatureLocalizationLoaderService
  ) {
    featureLocalizationLoaderService.preloadFeatureLocalizations('todos').subscribe(() => {
      translate.get([
        'TODOS__SIDEBAR_ITEMS__PENDING',
        'TODOS__SIDEBAR_ITEMS__COMPLETED'
      ]).subscribe(locales => {
        navigationService.registerSidebarComponents([
          {
            component: SidebarItemComponent,
            order: 1,
            inputs: {
              label: locales['TODOS__SIDEBAR_ITEMS__PENDING'],
              route: TODOS_MODULE_ROUTE_PATH + '/pending',
              icon: 'pending_actions'
            }
          },
          {
            component: SidebarItemComponent,
            order: 2,
            inputs: {
              label: locales['TODOS__SIDEBAR_ITEMS__COMPLETED'],
              route: TODOS_MODULE_ROUTE_PATH + '/completed',
              icon: 'assignment_turned_in'
            }
          }
        ]);
      });
    });
  }
}
