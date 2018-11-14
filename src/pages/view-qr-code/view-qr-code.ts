import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-view-qr-code',
  templateUrl: 'view-qr-code.html',
})
export class ViewQrCodePage {

  prod = this.navParams.get("prod")

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


}
