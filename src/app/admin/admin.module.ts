import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { TopNavComponent } from './layout/top-nav/top-nav.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../shared/material.module'

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FlexLayoutModule,
    MaterialModule
  ],
  declarations: [LayoutComponent, TopNavComponent]
})
export class AdminModule {}
