import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatTabsModule, MatToolbarModule } from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatTabsModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatTabsModule
  ],
})
export class CustomMaterialModule { }
