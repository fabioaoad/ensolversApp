import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ToListComponent} from "./components/to-list/to-list.component";
import {EditingTaskComponent} from "./components/editing-task/editing-task.component";

const routes: Routes = [

  {
    path: '',
    component: ToListComponent,
    pathMatch: 'full'
  },
  {
    path: 'items',
    component: ToListComponent
  },
  {
    path: 'editar/:id',
    component: EditingTaskComponent
  },
  {
    path: '**',
    redirectTo: 'auth'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
})
export class AppRoutingModule { }
