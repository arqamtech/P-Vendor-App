import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewQrCodePage } from './view-qr-code';

@NgModule({
  declarations: [
    ViewQrCodePage,
  ],
  imports: [
    IonicPageModule.forChild(ViewQrCodePage),
  ],
})
export class ViewQrCodePageModule {}
