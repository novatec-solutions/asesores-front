import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterTabs } from './router-tab/router-tabs.directive';
import { RouterTab } from './router-tab/router-tab.directive';

@NgModule({
  imports: [CommonModule, RouterModule, FlexLayoutModule],
  declarations: [RouterTabs, RouterTab],
  exports: [
    CommonModule,
    FlexLayoutModule,
    RouterTabs,
    RouterTab
  ]
})
export class SharedModule {}
