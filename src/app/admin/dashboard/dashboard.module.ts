import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { TableComponent } from '../../shared/components/table/table.component';
import { CalendarComponent } from '../../shared/components/calendar/calendar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { RoleStyleDirective } from 'src/app/shared/role-style.directive';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [HomeComponent, TableComponent, CalendarComponent, DialogComponent, RoleStyleDirective],
  exports: [TableComponent, CalendarComponent]
  
})
export class DashboardModule {}
