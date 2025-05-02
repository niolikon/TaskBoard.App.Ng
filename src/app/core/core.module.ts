import { NgModule } from '@angular/core';
import { SecurityModule } from './security/security.module';
import { LayoutModule } from './layout/layout.module';
import { CoreI18nModule } from './i18n/i18n.module';

@NgModule({
  imports: [
    SecurityModule,
    LayoutModule,
    CoreI18nModule
  ]
})
export class CoreModule {}
