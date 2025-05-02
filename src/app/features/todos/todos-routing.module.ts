import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendingTodosPageComponent } from './pages/pending-todos/pending-todos-page.component';
import { CompletedTodosPageComponent } from './pages/completed-todos/completed-todos-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'pending', pathMatch: 'full'},
  { path: 'pending', component: PendingTodosPageComponent },
  { path: 'completed', component: CompletedTodosPageComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodosRoutingModule {}
