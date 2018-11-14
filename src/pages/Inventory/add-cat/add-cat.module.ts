import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddCatPage } from './add-cat';

@NgModule({
  declarations: [
    AddCatPage,
  ],
  imports: [
    IonicPageModule.forChild(AddCatPage),
  ],
})
export class AddCatPageModule {}
