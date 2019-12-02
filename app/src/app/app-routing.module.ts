import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DisplayTechCheckListComponent } from './display-tech-check-list/display-tech-check-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectCheckListComponent } from './project-check-list/project-check-list.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'displayTechCheckList', component: DisplayTechCheckListComponent },
  { path: 'projectCheckListComponent', component: ProjectCheckListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
