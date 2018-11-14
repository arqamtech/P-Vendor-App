import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-scanner',
  templateUrl: 'scanner.html',
})
export class ScannerPage {
  scannedCode = null;

  product : any;
  Quantity : string;

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams,
  private barcodeScanner: BarcodeScanner,
  public toastCtrl : ToastController,
  ) {
    this.scanCode();
  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
    }, (err) => {
        console.log('Error: ', err);
    }).then(()=>{
      firebase.database().ref("Products").child(this.scannedCode).once("value",itemSnap=>{
        itemSnap.forEach(snap=>{
          var temp : any = snap.val();
          temp.key = snap.key
          this.product  = temp;
        })
      })
    });
  }
  checkData(){
    if(this.Quantity){
      this.addToInventory();
    }else{
      this.presentToast("Enter Quantity");
    }

  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    })
  }

  addToInventory(){
    
  }
}
