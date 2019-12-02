import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GoogleChartsModule } from 'angular-google-charts';
import { ToastyModule } from 'ng2-toasty';

import { AppMaterialModule } from './material-module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisplayTechCheckListComponent } from './display-tech-check-list/display-tech-check-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectCheckListComponent } from './project-check-list/project-check-list.component';
import { AddTechComponent } from './display-tech-check-list/add-tech/add-tech.component';
import { AddAppTechStackComponent } from './project-check-list/add-app-tech-stack/add-app-tech-stack.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplayTechCheckListComponent,
    DashboardComponent,
    ProjectCheckListComponent,
    AddTechComponent,
    AddAppTechStackComponent
  ],
  imports: [
    BrowserModule,
    AppMaterialModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    GoogleChartsModule,
    BrowserAnimationsModule,
    ToastyModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddTechComponent, AddAppTechStackComponent]
})
export class AppModule { }
