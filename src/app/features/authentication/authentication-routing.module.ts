import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login/login-page.component';
import { LoginSuccessPageComponent } from './pages/login-success/login-success-page.component';
import { LogoutSuccessPageComponent } from './pages/logout-success/logout-success-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginPageComponent },
  { path: 'success', component: LoginSuccessPageComponent },
  { path: 'logout', component: LogoutSuccessPageComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {}
