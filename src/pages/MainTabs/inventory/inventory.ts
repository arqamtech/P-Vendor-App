import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddProductsPage } from '../../Inventory/add-products/add-products';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { ViewQrCodePage } from '../../view-qr-code/view-qr-code';

@IonicPage()
@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html',
})
export class InventoryPage {

  products : Array<any>=[];

  constructor(
  public navCtrl: NavController, 
  public db : AngularFireDatabase,
  public navParams: NavParams
  ) {
    this.getProducts();
  }

  getProducts(){
    this.db.list("Products").snapshotChanges().subscribe(itemSnap=>{
      this.products = []
      itemSnap.forEach(snap=>{
        var temp : any = snap.payload.val();
        temp.key = snap.key;
        this.products.push(temp);
      })
    })
  }

  viewCode(p){
    this.navCtrl.push(ViewQrCodePage, {prod : p.key} );
  }
  gtAddProduct(){
    this.navCtrl.push(AddProductsPage);
  }
}
