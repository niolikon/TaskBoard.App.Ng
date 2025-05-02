import { NgModule } from '@angular/core';
import { SecurityModule } from './security/security.module';
import { LayoutModule } from './layout/layout.module';

@NgModule({
  imports: [
    SecurityModule,
    LayoutModule
  ]
})
export class CoreModule {}
